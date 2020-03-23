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
from collections import namedtuple

DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")
DB_COLLECTION = "cases"

DataSource = namedtuple("DataSource", "collection file")
DATA_FILEPATH = "data/cases"
META_FILEPATH = "data/meta"
DATA_COLLECTIONS = ["confirmed", "deaths", "recovered"]
META_COLLECTIONS = ["municipalities", "regions"]
DATA = [DataSource(c, format("%s/%s.csv" % (DATA_FILEPATH, c))) for c in DATA_COLLECTIONS]
META = [DataSource(c, format("%s/%s.csv" % (META_FILEPATH, c))) for c in META_COLLECTIONS]

# Ensure user and password are set before trying to connect to mongo
(DB_USER and DB_PASS) or exit("DB_USER and DB_PASS must be set in environment")
client = pymongo.MongoClient("mongodb://%s:%s@%s:%s" % (DB_USER, DB_PASS, DB_HOST, DB_PORT))
db = client[DB_NAME]

# Drop the collections prior to starting
for collection in META_COLLECTIONS + ["cases"]:
    print("Dropping collection %s" % collection)
    db.drop_collection(collection)

cases = {}
meta = {s.collection: {} for s in META}

# Create the meta collections for regions and municipalities. Store the object ids for reference from the
# cases collection
for source in META:
    print("Processing metadata file %s" % source.file)
    with open(source.file) as file:
        for row in csv.reader(file):
            result = db[source.collection].insert_one({"name": row[0]})
            meta[source.collection][row[0]] = result.inserted_id

# Process the data files.
for source in DATA:
    print("Processing data file %s" % source.file)
    with open(source.file) as file:
        for municipality, region, lat, lon, date, count in islice(csv.reader(file), 2, None):

            # key composed of municipality, region, and date. All data for this key (confirmed, deaths, recovered)
            # Will be stored in a single document
            key = hashlib.md5(format("%s_%s_%s" % (municipality, region, date)).encode()).hexdigest()
            region_id, municipality_id = None, None

            region_id = meta['regions'][region] if region else None
            municipality_id = meta['municipalities'][municipality] if municipality else None

            if key in cases:
                document = cases[key]
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
                cases[key] = document

            cases[key]["cases"][source.collection] = int(count) if count else 0

print("Creating collection %s" % DB_COLLECTION)
for case in cases.values():
    db["cases"].insert_one(case)

print("Creating geolocation index")
db["cases"].create_index([("geo", pymongo.GEOSPHERE)])

print("Creating date index")
db["cases"].create_index([("date", pymongo.DESCENDING)])

print("Import complete!")
