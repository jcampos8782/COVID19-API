import pymongo
import csv
from os import environ, walk
from os.path import join
import hashlib
from collections import namedtuple

from geolocation import resolve_location_by_coordinates, Location
import repository

Index = namedtuple("Index", "collection field type")
DataSource = namedtuple("DataSource", "series component file")

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

# Ensure series all exist. If not, create them
print("Checking MongoDB for existing series metadata")
with open(FILE_SERIES_NAMES) as file:
    [repository.find_or_create_series(key, name) for key, name in csv.reader(file)]

# Location ID to list of region ids
with open(FILE_GEO_COORDINATES) as file:
    found = 0
    created = 0

    for municipality, region, lat, lon in csv.reader(file):
        location = repository.find_location(region, municipality)
        if location:
            found += 1
            continue

        # New location. If lookup fails, manually create with the values in the file
        location = resolve_location_by_coordinates(lat, lon) or Location(lat, lon, region, municipality)
        region_id = repository.find_or_create_region(location.region)

        # Only check municipality if it was provided in the file
        # Some municipalities do not resolve via Google API (eg: Grand Princess). Default to file value
        municipality_id = repository.find_or_create_subregion(municipality, region_id) if municipality else None

        location_id = repository.create_location(
            region, municipality,
            float(location.lat), float(location.lon),
            (municipality_id or region_id))

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
        series = repository.find_series_by_key(source.series)
        repository.update_series(series, {"$set": {"cols": next(reader)[4:]}})

        for municipality, region, lat, lon, *data in reader:
            location = repository.find_location(region, municipality)
            series_key = hashlib.md5(format("%s-%s" % (source.series, location["_id"])).encode()).hexdigest()

            if series_key in documents:
                document = documents[series_key]
            else:
                print(location)
                # Lookup the region for this location. Add the id and its parent if they exist to this series' regions
                region = repository.find_region({"_id": location["region_id"]})
                document = {
                    "series_id": series["_id"],
                    "data": {},
                    "regions": [region[k] for k in ["_id", "parent_id"] if k in region]
                }
                documents[series_key] = document
            documents[series_key]["data"][source.component] = [int(n) for n in data]

repository.recreate_collection("data", documents)
repository.create_indices(DB_INDICES)

print("Import complete!")
