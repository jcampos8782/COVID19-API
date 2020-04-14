import csv
from os import walk
import hashlib
import preprocessors.us_county_importer as county_importer
from config import *
from util.geolocation import resolve_location_by_coordinates, Location
from util import repository


def main():
    (GOOGLE_API_KEY and DB_USER and DB_PASS) or exit("GOOGLE_API_KEY, DB_USER, and DB_PASS must be set in env")

    print("Loading series and updating metadata...")
    with open(FILE_SERIES_DEFINITIONS, encoding="utf8") as file:
        [__create_or_update_series(key, name) for key, name in csv.reader(file)]

    print("Creating US Counties")
    county_importer.create_us_counties()

    print("Importing coordinates from %s" % FILE_GEO_COORDINATES)
    with open(FILE_GEO_COORDINATES, encoding="utf8") as file:
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
        # Split using the filename. The series is one directory above the file.
        path_components = path.split(file)[0].split('/')
        series = path_components[len(path_components) - 1]
        return DataSource(series, file.split('.')[0], join(path, file))

    sources = [__create_data_source(dp, f) for dp, dn, fn in walk(DATA_DIRECTORY) for f in fn]
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

        repository.create_location(
            region, municipality,
            float(location.lat), float(location.lon),
            (municipality_id or region_id))

        created += 1
    print("Location lookups complete. Existing: %d, Created: %d" % (found, created))


def __create_or_update_series(key: str, name: str) -> None:
    with open(join(META_DIRECTORY, format("%s.csv" % key)), encoding='utf8') as metadata:
        cols = next(csv.reader(metadata))
        repository.create_or_update_series(key, name, cols)


# Process the data files.
def __import_data_from_sources(sources: [DataSource]) -> None:
    documents = {}
    for source in sources:
        print("Processing data file %s" % source.file)
        with open(source.file, encoding="utf8") as file:
            reader = csv.reader(file)
            for municipality, region, lat, lon, *data in reader:
                series = repository.find_series_by_key(source.series)
                location = repository.find_location(region, municipality)
                series_key = hashlib.md5(format("%s-%s" % (source.series, location["_id"])).encode()).hexdigest()

                if series_key not in documents:
                    region = repository.find_region({"_id": location["region_id"]})
                    document = {
                        "series_id": series["_id"],
                        "data": {},
                        "regions": [region[k] for k in ["_id", "parent_id"] if k in region]
                    }
                    documents[series_key] = document
                documents[series_key]["data"][source.component] = [int(n) for n in data]

    repository.recreate_collection("data", documents)


if __name__ == '__main__':
    main()
