import pymongo
import csv
import requests
from os import listdir, environ
from os.path import isfile, join
import hashlib
from itertools import islice
from collections import namedtuple

Index = namedtuple("Index", "collection field type")
DataSource = namedtuple("DataSource", "series file")

DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")
DB_COLL = "series"

GOOGLE_API_KEY = environ.get("GOOGLE_API_KEY")

(DB_USER and DB_PASS) or exit("DB_USER and DB_PASS must be set in environment")
GOOGLE_API_KEY or exit("GOOGLE_API_KEY must be set in environment")

DB_INDICES = [
    Index("regions", "name", pymongo.HASHED),
    Index("regions", "parent_id", pymongo.HASHED),
    Index("locations", "region_id", pymongo.HASHED),
    Index("locations", "geo", pymongo.GEOSPHERE),
    Index("series", "location.regions", pymongo.ASCENDING)
]

GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false&key=%s"
SERIES_FILE_PATH = "data/series"
FILE_GEO_COORDINATES = "data/meta/coordinates.csv"

# Convert the files in the SERIES_FILE_PATH directory to sources with a type and file
series_files = [f for f in listdir(SERIES_FILE_PATH) if isfile(join(SERIES_FILE_PATH, f))]
series_datasources = [DataSource(f.split('.')[0], "%s/%s" % (SERIES_FILE_PATH, f)) for f in series_files]

if not series_datasources:
    exit("No CSV files found in directory %s" % SERIES_FILE_PATH)

for source in series_datasources:
    print("Found series '%s' in file %s" % (source.series, source.file))

# Ensure user and password are set before trying to connect to mongo
client = pymongo.MongoClient("mongodb://%s:%s@%s:%s" % (DB_USER, DB_PASS, DB_HOST, DB_PORT))
db = client[DB_NAME]

series = {}
locations = {}

print("Performing coordinate reverse lookup via Google APIs")
with open(FILE_GEO_COORDINATES) as file:
    for default_mun, default_reg, lat, lon in csv.reader(file):
        # Attempt to lookup in database. If no match, fetch from Google
        # Use a mashup of the sub-region and the region for lookups. This allows for two locations to have the
        # same geocoordinates but one be a parent of the other.
        key = hashlib.md5(format("%s-%s" % ((default_mun.lower()), default_reg.lower())).encode()).hexdigest()

        location = db['locations'].find_one({'key': key})

        if location:
            region = db['regions'].find_one({'_id': location["region_id"]})
            locations[key] = {
                "location_id": location["_id"],
                "regions": [region[k] for k in ["_id", "parent_id"] if k in region]
            }
            continue

        print("Fetching location data for lat: %s lon: %s" % (lat, lon))
        response = requests.get(GOOGLE_GEOCODE_URL % (lat, lon, GOOGLE_API_KEY))
        results = response.json()['results']

        municipality, region = default_mun, default_reg

        if results:
            # See Google Geocoding reverse lookup documentation:
            # https://developers.google.com/maps/documentation/geocoding/intro#reverse-example
            region_component = [loc for loc in results if "country" in loc['types']]

            if region_component:
                region = region_component[0]['address_components'][0]['long_name']
            else:
                print("No region found. Defaulting to %s" % default_reg)

            # Only process the sub-region if one is specified in the input file
            if default_mun:
                municipality_component = [loc for loc in results if "administrative_area_level_1" in loc['types']]
                if municipality_component:
                    municipality = municipality_component[0]['address_components'][0]['long_name']
                else:
                    print("No municipality found. Defaulting to %s" % default_mun)

        # Check if region exists in database
        municipality_id, region_id = None, None
        if region:
            db_region = db["regions"].find_one({"name": region})
            if db_region:
                region_id = db_region["_id"]
            else:
                print("New region: %s" % region)
                db_region = db['regions'].insert_one({"name": region})
                region_id = db_region.inserted_id

        if municipality:
            db_municipality = db["regions"].find_one({"name": municipality})
            if db_municipality:
                municipality_id = db_municipality["_id"]
            else:
                print("New municipality: %s for region %s" % (municipality, region))
                db_municipality = db['regions'].insert_one({"name": municipality, "parent_id": region_id})
                municipality_id = db_municipality.inserted_id

        location = {
            "key": key,
            "geo": {
                "type": "Point",
                "coordinates": [float(lon), float(lat)]
            },
            "region_id": municipality_id if municipality else region_id
        }

        result = db['locations'].insert_one(location)
        locations[key] = {
                "location_id": location["_id"],
                "regions": [i for i in [region_id, municipality_id] if i]
            }

# Process the data files.
for source in series_datasources:
    print("Processing data file %s" % source.file)
    with open(source.file) as file:
        # skip header using islice
        for municipality, region, lat, lon, *data in islice(csv.reader(file), 1, None):
            location_key = hashlib.md5(format("%s-%s" % ((municipality.lower()), region.lower())).encode()).hexdigest()

            if location_key in series:
                document = series[location_key]
            else:

                document = {
                    "data": {},
                    "location": locations[location_key]
                }

                series[location_key] = document
            series[location_key]["data"][source.series] = [int(n) for n in data]

print("Creating collection %s" % DB_COLL)
for doc in series.values():
    db["series"].insert_one(doc)

for index in DB_INDICES:
    print("Creating %s index on field %s for collection %s" % (index.type, index.field, index.collection))
    db[index.collection].create_index([(index.field, index.type)])

print("Import complete!")
