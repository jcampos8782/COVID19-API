from os import environ
from models import Index
import pymongo
from os.path import dirname, join

script_dir = dirname(__file__)
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
        Index("data", "location.regions", pymongo.ASCENDING)
]

GOOGLE_API_KEY = environ.get("GOOGLE_API_KEY")

META_DIRECTORY = join(script_dir, "../data/meta")
DATA_DIRECTORY = join(script_dir, "../data/processed")
FILE_GEO_COORDINATES = join(script_dir, "../data/meta/coordinates.csv")
FILE_SERIES_DEFINITIONS = join(script_dir, "../data/meta/series.csv")

GEOCODE_COORD_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false&key=%s"
GEOCODE_ADDR_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false&key=%s"

US_PROCESSOR_COLUMN_DEFINITIONS = {'region': 6, 'data': {'confirmed': 11, 'deaths': 12}}
US_PROCESSOR_OUTPUT_FILE_DIR = join(script_dir, "../data/processed/covid19")
US_PROCESSOR_INPUT_FILES = [
    ("confirmed", join(script_dir, "../data/downloads/github/CSSEGISandData/confirmed_us.csv")),
    ("deaths", join(script_dir, "../data/downloads/github/CSSEGISandData/deaths_us.csv"))]
