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
LOOKUPS_DIRECTORY = join(ROOT_DIR, "data/lookups")
DOWNLOADS_DIRECTORY = join(ROOT_DIR, "data/downloads")
GITHUB_DIRECTORY = join(DOWNLOADS_DIRECTORY, "github")
OUTPUT_DIRECTORY = join(DATA_DIRECTORY, "covid19")

"""
SHARED FILES
"""
FILE_SERIES_DEFINITIONS = join(META_DIRECTORY, "series.csv")
FILE_REGIONS = join(META_DIRECTORY, "regions.csv")
FILE_LOCATIONS = join(META_DIRECTORY, "locations.csv")
FILE_DEMOGRAPHICS = join(META_DIRECTORY, "demographics.csv")
FILE_FACTS = join(META_DIRECTORY, "facts.json")
FILE_SIP_ORDERS = join(META_DIRECTORY, "sip_orders.csv")
FILE_CONTACTS = join(META_DIRECTORY, "contacts.csv")
FILE_RT_LIVE = join(DOWNLOADS_DIRECTORY, "rt.live/data.csv")
FILE_US_STATES_AND_ISO_CODES = join(LOOKUPS_DIRECTORY, "us_states_and_iso_codes.csv")
FILE_MX_STATES_AND_ISO_CODES = join(LOOKUPS_DIRECTORY, "mx_states_and_iso_codes.csv")

"""
ENVIRONMENT VARIABLES
"""
DB_USER = environ.get("DB_USER")
DB_PASS = environ.get("DB_PASS")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_PORT = environ.get("DB_PORT",  "27017")
DB_NAME = environ.get("DB_NAME", "cvd19")

"""
DOWNLOADS
"""
FILE_JHU_REGIONS = join(GITHUB_DIRECTORY, "CSSEGISandData/regions.csv")
FILE_MX_REGIONS = join(META_DIRECTORY, "mx_regions.csv")
FILE_COVID_TRACKER_STATES_CURRENT = join(DOWNLOADS_DIRECTORY, "covidtracking/states_current.json")
FILE_COVID_TRACKER_STATES_META = join(DOWNLOADS_DIRECTORY, "covidtracking/states_meta.json")
FILE_COVID_TRACKER_US_CURRENT = join(DOWNLOADS_DIRECTORY, "covidtracking/us_current.json")

"""
DOWNLOADS_PROCESSOR
"""
DOWNLOADS_PROCESSOR_NAME_FILTER = [re.compile(s) for s in ["Unassigned", "^Out of", "Recovered"]]
DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS = {
    'US': 'United States',
    'Korea, South': 'South Korea',
    'Taiwan*': 'Taiwan',
    'Bonaire, Sint Eustatius and Saba': 'Bonaire/Sint Eustatius/Saba',
    'District of Columbia, District of Columbia': 'District of Columbia',
    'District of Columbia,District of Columbia': 'District of Columbia'
}

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
        Index("demographics", "region_id", pymongo.HASHED),
        Index("facts", "region_id", pymongo.HASHED),
        Index("contacts", "region_id", pymongo.HASHED)
]

"""
GOOGLE API
"""
GOOGLE_API_GEOCODE_COORD_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false&key=%s"
GOOGLE_API_GEOCODE_ADDR_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false&key=%s"
GOOGLE_API_KEY = environ.get("GOOGLE_API_KEY")

"""
US PREPROCESSOR
 - US_PROCESSOR_COLUMN_DEFINITIONS: The columns in the data files is inconsistent. This defines the fields for each file
 - US_PROCESSOR_DATA_SOURCES: series component and file location tuple
"""
US_PROCESSOR_FILTERED_KEYS = set(["united_states"])
US_PROCESSOR_COLUMN_DEFINITIONS = {'confirmed': {'name': 5, 'key': 10, 'data': 11}, 'deaths': {'name': 5, 'key': 10, 'data': 12}}
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
GLOBAL PREPROCESSOR
"""
GLOBAL_PROCESSOR_COLUMN_DEFINITIONS = {'confirmed': {'name': 5, 'data': 11}, 'deaths': {'name': 5, 'data': 12}}
GLOBAL_PROCESSOR_DATA_SOURCES = [
    DataSource("covid19", "confirmed", join(GITHUB_DIRECTORY, "CSSEGISandData/confirmed_global.csv")),
    DataSource("covid19", "deaths", join(GITHUB_DIRECTORY, "CSSEGISandData/deaths_global.csv")),
    DataSource("covid19", "recovered", join(GITHUB_DIRECTORY, "CSSEGISandData/recovered_global.csv"))
]

"""
COVIDTRACKING.COM PREPROCESSOR
"""
COVID_TRACKING_PROCESSOR_STATE_FIELDS = [
    "positive", "negative", "pending", "recovered", "hospitalizedCurrently", "hospitalizedCumulative",
    "inIcuCurrently", "inIcuCumulative", "onVentilatorCurrently", "onVentilatorCumulative", "dateModified"
]

COVID_TRACKING_PROCESSOR_US_FIELDS = [
    "positive", "negative", "pending", "recovered", "hospitalizedCurrently", "hospitalizedCumulative",
    "inIcuCurrently", "inIcuCumulative", "onVentilatorCurrently", "onVentilatorCumulative", "lastModified"
]

COVID_TRACKING_FACT_FIELDS = {
    "positive": "positiveTests",
    "negative": "negativeTests",
    "pending": "pendingTests",
    "lastModified": "dateModified"
}

COVID_TRACKING_PROCESSOR_META_FIELDS = {"covid19Site": "www", "twitter": "twitter"}


"""
SHELTER IN PLACE (SIP) SCRAPER
"""
SIP_SCRAPER_URL = "https://www.finra.org/rules-guidance/key-topics/covid-19/shelter-in-place"
SIP_SCRAPER_DOWNLOAD_DIRECTORY = join(DOWNLOADS_DIRECTORY, "finra")
SIP_SCRAPER_PARSER = "lxml"

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

"""
RT.LIVE DOWNLOADER
"""
RT_LIVE_DOWNLOADER_URL = "https://d14wlfuexuxgcm.cloudfront.net/covid/rt.csv"

