import pymongo
import csv
import requests
from os import environ, walk
from os.path import join
import hashlib
from collections import namedtuple

Index = namedtuple("Index", "collection field type")
DataSource = namedtuple("DataSource", "series component file")

DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")
DB_COLL = "data"

GOOGLE_API_KEY = environ.get("GOOGLE_API_KEY")

(DB_USER and DB_PASS) or exit("DB_USER and DB_PASS must be set in environment")
GOOGLE_API_KEY or exit("GOOGLE_API_KEY must be set in environment")

GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false&key=%s"

DB_INDICES = [
    Index("regions", "name", pymongo.HASHED),
    Index("regions", "parent_id", pymongo.HASHED),
    Index("locations", "region_id", pymongo.HASHED),
    Index("locations", "geo", pymongo.GEOSPHERE),
    Index("series", "name", pymongo.HASHED),
    Index("imports", "location.regions", pymongo.ASCENDING)
]

SERIES_FILE_PATH = "imports/data"
FILE_GEO_COORDINATES = "imports/meta/coordinates.csv"
FILE_SERIES_NAMES = "imports/meta/series.csv"

# Load each file into a DataSource.
# SERIES_FILE_PATH/<series-name>/<component-name>.csv
series_datasources = [DataSource(dp.split('/')[2], f.split('.')[0], join(dp, f)) for dp, dn, fn in walk(SERIES_FILE_PATH) for f in fn]

if not series_datasources:
    exit("No data files found in directory %s" % SERIES_FILE_PATH)

for source in series_datasources:
    print("Found component '%s' for series '%s' in file %s" % (source.component, source.series, source.file))

db = pymongo.MongoClient("mongodb://%s:%s@%s:%s" % (DB_USER, DB_PASS, DB_HOST, DB_PORT))[DB_NAME]

# Ensure series all exist. If not, create them
print("Checking MongoDB for existing series metadata")
series = {}
for key, name in csv.reader(open(FILE_SERIES_NAMES)):
    hashed_key = hashlib.md5(key.encode()).hexdigest()
    series[key] = db['series'].find_one({"key": hashed_key})
    if not series[key]:
        print("Creating new series %s" % name)
        new_series = {
            "key": hashed_key,
            "name": name,
            "cols": []
        }
        db['series'].insert_one(new_series)
        series[key] = new_series

print("Performing coordinate reverse lookup via Google APIs")
regions = {}
with open(FILE_GEO_COORDINATES) as file:
    found = 0
    created = 0

    for default_mun, default_reg, lat, lon in csv.reader(file):
        # Attempt to lookup in database. If no match, fetch from Google
        # Use a mashup of the sub-region and the region for lookups. This allows for two locations to have the
        # same geocoordinates but one be a parent of the other.
        key = hashlib.md5(format("%s-%s" % ((default_mun.lower()), default_reg.lower())).encode()).hexdigest()
        location = db['locations'].find_one({'key': key})
        if location:
            region = db['regions'].find_one({'_id': location["region_id"]})
            regions[key] = [region[k] for k in ["_id", "parent_id"] if k in region]
            found += 1
            continue

        print("Fetching location imports for lat: %s lon: %s" % (lat, lon))
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
                    print("No municipality found. Defaulting to %s" % default_mun.encode('utf-8'))

        # Check if region exists in database
        municipality_id, region_id = None, None
        if region:
            db_region = db["regions"].find_one({"name": region})
            if db_region:
                region_id = db_region["_id"]
            else:
                print("New region: %s" % region.encode('utf-8'))
                db_region = db['regions'].insert_one({"name": region})
                region_id = db_region.inserted_id

        if municipality:
            db_municipality = db["regions"].find_one({"name": municipality})
            if db_municipality:
                municipality_id = db_municipality["_id"]
            else:
                print("New municipality: %s for region %s" % (municipality.encode('utf-8'), region.encode('utf-8')))
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
        regions[key] = [i for i in [municipality_id, region_id] if i]
        created += 1

    print("Location lookups complete. Existing: %d, Created: %d" % (found, created))

# Process the imports files.
documents = {}
for source in series_datasources:
    print("Processing imports file %s" % source.file)
    with open(source.file) as file:
        reader = csv.reader(file)

        # Update column data for series
        # TODO: This should only have to happen once per series. Move to metadata file?
        db["series"].update_one(series[source.series], {"$set": {"cols": next(reader)[4:]}})

        for municipality, region, lat, lon, *data in reader:
            location_key = hashlib.md5(format("%s-%s" % ((municipality.lower()), region.lower())).encode()).hexdigest()
            series_key = hashlib.md5(format("%s-%s" % (source.series, location_key)).encode()).hexdigest()

            if series_key in documents:
                document = documents[series_key]
            else:
                document = {
                    "series_id": series[source.series]["_id"],
                    "data": {},
                    "regions": regions[location_key]
                }
                documents[series_key] = document
            documents[series_key]["data"][source.component] = [int(n) for n in data]


print("Recreating collection %s" % DB_COLL)
db.drop_collection(DB_COLL)
for doc in documents.values():
    db[DB_COLL].insert_one(doc)

for index in DB_INDICES:
    print("Creating %s index on field %s for collection %s" % (index.type, index.field, index.collection))
    db[index.collection].create_index([(index.field, index.type)])

print("Import complete!")
