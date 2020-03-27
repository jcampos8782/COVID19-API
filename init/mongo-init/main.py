"""
Creates a initializes a MongoDB collection of COVID-19 cases

Initializes a MongoDb collection with COVID-19 data containing the number of confirmed cases, recoveries, and deaths.
The schema contains location data by municipality, region, and also geographical coordinates. There is one entry
per municipality/region per day dating back to 1/21/2020.

Parameters:
To use, set the following environment variables and execute this import script:
DB_USER: mongodb username
DB_PASS: mongodb password
DB_HOST: mongodb host (default localhost)
DB_PORT: mongodb port (default 27017)
DB_NAME: name of the db to create (default cvd19)

Returns:
None
"""

import pymongo
import csv
import requests
from os import environ
from itertools import islice
from collections import namedtuple

Index = namedtuple("Index", "collection field type")
DataSource = namedtuple("DataSource", "collection file")

DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")
DB_COLL = "cases"

GOOGLE_API_KEY = environ.get("GOOGLE_API_KEY")

(DB_USER and DB_PASS) or exit("DB_USER and DB_PASS must be set in environment")
GOOGLE_API_KEY or exit("GOOGLE_API_KEY must be set in environment")

DB_INDICES = [
    Index("municipalities", "region_id", pymongo.HASHED),
    Index("locations", "region_id", pymongo.HASHED),
    Index("locations", "municipality_id", pymongo.HASHED),
    Index("locations", "geo", pymongo.GEOSPHERE),
    Index("cases", "location._id", pymongo.HASHED),
    Index("cases", "location.region_id", pymongo.HASHED),
    Index("cases", "location.municipality_id", pymongo.HASHED)
]

GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false&key=%s"

GLOBAL_CONFIRMED = DataSource("confirmed", "data/cases/global_confirmed.csv")
GLOBAL_DEATHS = DataSource("deaths", "data/cases/global_deaths.csv")

FILE_GEO_COORDINATES = "data/meta/coordinates.csv"

# Ensure user and password are set before trying to connect to mongo
client = pymongo.MongoClient("mongodb://%s:%s@%s:%s" % (DB_USER, DB_PASS, DB_HOST, DB_PORT))
db = client[DB_NAME]

# Drop the collections prior to starting
for collection in ["cases", "regions", "municipalities"]:
    print("Dropping collection %s" % collection)
    db.drop_collection(collection)

cases = {}
locations = {}

print("Performing coordinate reverse lookup via Google APIs")
with open(FILE_GEO_COORDINATES) as file:
    for default_mun, default_reg, lat, lon in csv.reader(file):
        # Attempt to lookup in database. If no match, fetch from Google
        key = format("%s-%s" % (format("%.3f" % float(lat)), format("%.3f" % float(lon))))
        result = db['locations'].find_one({'key': key})

        if result:
            locations[key] = result
            continue

        print("Fetching location data for lat: %s lon: %s" % (lat, lon))
        response = requests.get(GOOGLE_GEOCODE_URL % (lat, lon, GOOGLE_API_KEY))
        results = response.json()['results']

        municipality, region = None, None

        if results:
            municipality_component = list(filter(lambda e: "administrative_area_level_1" in e['types'], results))
            region_component = list(filter(lambda e: "country" in e['types'], results))

            if municipality_component:
                municipality = municipality_component[0]['address_components'][0]['long_name']
            else:
                print("No municipality found. Defaulting to %s" % default_mun)
                municipality = default_mun

            if region_component:
                region = region_component[0]['address_components'][0]['long_name']
            else:
                print("No region found. Defaulting to %s" % default_reg)
                region = default_reg

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
            db_municipality = db["municipalities"].find_one({"name": municipality})
            if db_municipality:
                municipality_id = db_municipality["_id"]
            else:
                print("New municipality: %s" % municipality)
                db_municipality = db['municipalities'].insert_one({"name": municipality, "region_id": region_id})
                municipality_id = db_municipality.inserted_id

        location = {
            "key": key,
            "geo": {
                "type": "Point",
                "coordinates": [float(lon), float(lat)]
            },
            "region_id": region_id,
            "municipality_id": municipality_id
        }

        result = db['locations'].insert_one(location)
        locations[key] = location

# Process the data files.
for source in [GLOBAL_CONFIRMED, GLOBAL_DEATHS]:
    print("Processing data file %s" % source.file)
    with open(source.file) as file:
        # skip header using islice
        for municipality, region, lat, lon, *series in islice(csv.reader(file), 1, None):
            location_key = format("%s-%s" % (format("%.3f" % float(lat)), format("%.3f" % float(lon))))
            location = locations[location_key]

            if location_key in cases:
                document = cases[location_key]
            else:
                document = {
                    "cases": {},
                    "location": {
                        "_id": location["_id"],
                        "region_id": location["region_id"],
                        # Only include municipality data if its included in the CSV file
                        "municipality_id": location["municipality_id"] if municipality else None
                    }
                }

                cases[location_key] = document

            cases[location_key]["cases"][source.collection] = [int(n) for n in series]

print("Creating collection %s" % DB_COLL)
for case in cases.values():
    db["cases"].insert_one(case)

for index in DB_INDICES:
    print("Creating %s index on field %s for collection %s" % (index.type, index.field, index.collection))
    db[index.collection].create_index([(index.field, index.type)])

print("Import complete!")
