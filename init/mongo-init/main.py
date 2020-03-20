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
from datetime import datetime
import hashlib
from os import environ
from itertools import islice

DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")
DB_COLLECTION = "cases"

(DB_USER and DB_PASS) or exit("DB_USER and DB_PASS must be set in environment")

client = pymongo.MongoClient("mongodb://%s:%s@%s:%s" % (DB_USER, DB_PASS, DB_HOST, DB_PORT))
db = client[DB_NAME]

for collection in db.list_collection_names():
    print("Dropping collection %s" % collection)
    db.drop_collection(collection)

files = ['Confirmed', 'Deaths', 'Recovered']
documents = {}
regions = {}
municipalities = {}

for suffix in files:
    filename = format("time_series-ncov-%s.csv" % suffix)
    print("Processing CSV %s" % filename)

    with open(filename) as file:
        for municipality, region, lat, lon, date, count  in islice(csv.reader(file), 2, None):

            # key composed of municipality, region, and date
            key = hashlib.md5(format("%s_%s_%s" % (municipality, region, date)).encode()).hexdigest()
            region_id, municipality_id = None, None

            if region and region in regions:
                region_id = regions[region]
            elif region:
                result = db["regions"].insert_one({'name': region})
                region_id = result.inserted_id
                regions[region] = region_id

            if municipality and municipality in municipalities:
                municipality_id = municipalities[municipality]
            elif municipality:
                result = db["municipalities"].insert_one({'name': municipality})
                municipality_id = result.inserted_id
                municipalities[municipality] = municipality_id

            if key in documents:
                document = documents[key]
            else:
                document = {
                    "date": datetime.strptime(date, "%Y-%m-%d"),
                    "cases": {},
                    "geo": {
                        "type": "Point",
                        "coordinates": [float(lon), float(lat)]
                    },
                    "location": {
                        "municipality": municipality,
                        "municipality_id": municipality_id,
                        "region": region,
                        "region_id": region_id
                    }
                }
                documents[key] = document

            documents[key]["cases"][suffix.lower()] = int(count) if count else 0

print("Creating collection %s" % DB_COLLECTION)
for document in documents.values():
    db["cases"].insert_one(document)

print("Creating geolocation index")
db["cases"].create_index([("geo", pymongo.GEOSPHERE)])

print("Import complete!")
