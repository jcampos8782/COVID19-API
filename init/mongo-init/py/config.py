from os import environ
from datetime import date
from models import Index, DataSource
import pymongo
import re
from os.path import dirname, join

script_dir = dirname(__file__)

"""
CONSTANTS
"""
SERIES_START_DATE = date(2020, 1, 21)

"""
DIRECTORIES
"""
ROOT_DIR = join(script_dir, "../../../")
META_DIRECTORY = join(ROOT_DIR, "data/meta")
DATA_DIRECTORY = join(ROOT_DIR, "data/processed")
DOWNLOADS_DIRECTORY = join(ROOT_DIR, "data/downloads")
GITHUB_DIRECTORY = join(DOWNLOADS_DIRECTORY, "github")
OUTPUT_DIRECTORY = join(DATA_DIRECTORY, "covid19")

"""
SHARED FILES
"""
FILE_GEO_COORDINATES = join(META_DIRECTORY, "coordinates.csv")
FILE_SERIES_DEFINITIONS = join(META_DIRECTORY, "series.csv")
MX_STATES_FILE = join(META_DIRECTORY, "mx_states_and_iso_codes.csv")
FILE_US_COUNTIES = join(META_DIRECTORY, "us_counties.csv")

"""
ENVIRONMENT VARIABLES
"""
DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")


"""
MONGO
"""
MONGO_CONNECTION_STR = "mongodb://%s:%s@%s:%s" % (DB_USER, DB_PASS, DB_HOST, DB_PORT)
MONGO_INDEXES = [
        Index("regions", "name", pymongo.HASHED),
        Index("regions", "parent_id", pymongo.HASHED),
        Index("locations", "region_id", pymongo.HASHED),
        Index("locations", "geo", pymongo.GEOSPHERE),
        Index("series", "name", pymongo.HASHED),
        Index("data", "location.regions", pymongo.ASCENDING),
        Index("demographics", "region_id", pymongo.HASHED)
]

"""
GOOGLE API
"""
GOOGLE_API_GEOCODE_COORD_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false&key=%s"
GOOGLE_API_GEOCODE_ADDR_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false&key=%s"
GOOGLE_API_KEY = environ.get("GOOGLE_API_KEY")
GOOGLE_API_LOCATION_TEXT_FOR = {
    'Yucatán': 'Yucatan',
    'Nuevo León': 'Nuevo Leon',
    'Michoacan': 'Michoacán',
    'Queretaro': 'Querétaro'
}

"""
US PREPROCESSOR
 - US_PROCESSOR_COLUMN_DEFINITIONS: The columns in the data files is inconsistent. This defines the fields for each file
 - US_PROCESSOR_DATA_SOURCES: series component and file location tuple
"""
US_PROCESSOR_COLUMN_DEFINITIONS = {'county': 5, 'state': 6, 'lat': 8, 'lon': 9, 'data': {'confirmed': 11, 'deaths': 12}}
US_PROCESSOR_FILTERED_COUNTIES = [re.compile(s) for s in ["Unassigned", "^Out of"]]
US_PROCESSOR_DATA_SOURCES = [
    DataSource("covid19", "confirmed", join(GITHUB_DIRECTORY, "CSSEGISandData/confirmed_us.csv")),
    DataSource("covid19", "deaths", join(GITHUB_DIRECTORY, "CSSEGISandData/deaths_us.csv"))
]

"""
MX PREPROCESSOR
"""
MX_PROCESSOR_DATA_START_DATE = date(2020, 1, 23)
MX_PROCESSOR_DATA_FILE = join(GITHUB_DIRECTORY, 'carranco-sga/mx_data.csv')
MX_PROCESSOR_DATA_SOURCES = [
    DataSource("covid19", "confirmed", join(OUTPUT_DIRECTORY, "confirmed_mx.csv")),
    DataSource("covid19", "deaths", join(OUTPUT_DIRECTORY, "deaths_mx.csv"))
]
MX_PROCESSOR_COLUMN_SUFFIXES = {
    'confirmed': '',
    'deaths': '_D'
}

"""
MX SCRAPER
"""
MX_SCRAPER_URL = "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Mexico"
MX_SCRAPER_PARSER = "lxml"
MX_SCRAPER_DOWNLOAD_DIRECTORY = join(DOWNLOADS_DIRECTORY, "wikiepedia/mexico")
MX_SCRAPER_VERSION_HASH = join(MX_SCRAPER_DOWNLOAD_DIRECTORY, "hash.txt")
MX_SCRAPER_WIKI_TEXT = {
    'San Luis Potosi': 'San Luis Potosí',
    'Nuevo Leon': 'Nuevo León'
}
MX_SCRAPER_ROW_OFFSET = {
    'default': 0,
    'Mexico City': 1
}
MX_SCRAPER_EXPECTED_ROWS = {
    'default': 2,
    'Mexico City': 3,
    'Baja California': 4
}
