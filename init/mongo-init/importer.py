import csv
from os import walk
from os.path import join
import hashlib

from models import DataSource
from config import DATA_DIRECTORY, FILE_SERIES_DEFINITIONS, FILE_GEO_COORDINATES, MONGO_INDEXES
from geolocation import resolve_location_by_coordinates, Location
import repository


def main():
    print("Checking MongoDB for existing series metadata")
    with open(FILE_SERIES_DEFINITIONS) as file:
        [repository.find_or_create_series(key, name) for key, name in csv.reader(file)]

    print("Importing coordinates from %s" % FILE_GEO_COORDINATES)
    with open(FILE_GEO_COORDINATES) as file:
        __import_locations_from_coordinates_file(file)

    print("Importing data from files")
    __import_data_from_sources(__create_data_sources())

    print("Creating indices")
    repository.create_indices(MONGO_INDEXES)
    print("Import complete!")


def __create_data_sources() -> [DataSource]:
    """
    Load each file into a DataSource of component, series, and file.
    <path>/series/component/file.csv
    """
    def __create_data_source(path: str, file: str) -> DataSource:
        return DataSource(path.split('/')[2], file.split('.')[0], join(path, file))

    sources = [__create_data_source(dp,f) for dp, dn, fn in walk(DATA_DIRECTORY) for f in fn]
    if not sources:
        exit("No data files found in directory %s" % DATA_DIRECTORY)
    for source in sources:
        print("Found component '%s' for series '%s' in file %s" % (source.component, source.series, source.file))
    return sources

def __import_locations_from_coordinates_file(file) -> None:
    # Location ID to list of region ids
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
def __import_data_from_sources(sources: [DataSource]) -> None:
    documents = {}
    for source in sources:
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


main()
