from os import environ
from models import Index
import pymongo

DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")

MONGO_CONNECTION_STR = "mongodb://%s:%s@%s:%s" % (DB_USER, DB_PASS, DB_HOST, DB_PORT)
MONGO_INDEXES = [
        Index("regions", "name", pymongo.HASHED),
        Index("regions", "parent_id", pymongo.HASHED),
        Index("locations", "region_id", pymongo.HASHED),
        Index("locations", "geo", pymongo.GEOSPHERE),
        Index("series", "name", pymongo.HASHED),
        Index("imports", "location.regions", pymongo.ASCENDING)
]

GOOGLE_API_KEY = environ.get("GOOGLE_API_KEY")

DATA_DIRECTORY = "imports/data"
FILE_GEO_COORDINATES = "imports/meta/coordinates.csv"
FILE_SERIES_DEFINITIONS = "imports/meta/series.csv"

GEOCODE_COORD_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false&key=%s"
GEOCODE_ADDR_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false&key=%s"
