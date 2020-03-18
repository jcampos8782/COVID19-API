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

if DB_COLLECTION in db.list_collection_names():
    print("Dropping collection %s" % DB_COLLECTION)
    db.drop_collection(DB_COLLECTION)

files = ['Confirmed', 'Deaths', 'Recovered']
documents = {}

for suffix in files:
    filename = format("time_series-ncov-%s.csv" % suffix)
    print("Processing CSV %s" % filename)

    with open(filename) as file:
        reader = csv.reader(file)
        i = 0
        for municipality, region, lat, lon, date, count  in islice(reader, 2, None):

            # key composed of municipality, region, and date
            key = hashlib.md5(format("%s_%s_%s" % (municipality, region, date)).encode()).hexdigest()

            if key in documents:
                document = documents[key]
            else:
                document = {
                    "date": datetime.strptime(date, "%Y-%d-%M"),
                    "cases": {},
                    "geo": {
                        "type": "Point",
                        "coordinates": [float(lon), float(lat)]
                    },
                    "location": {
                        "municipality": municipality,
                        "region": region
                    }
                }
                documents[key] = document

            documents[key]["cases"][suffix.lower()] = int(count)

print("Creating collection %s" % DB_COLLECTION)
for document in documents.values():
    db["cases"].insert_one(document)

print("Creating geolocation index")
db["cases"].create_index([("geo", pymongo.GEOSPHERE)])

print("Import complete!")
