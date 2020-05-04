import csv
from os import walk
from importers import *
from config import *
from util import repository


def main():
    (DB_USER and DB_PASS) or exit("GOOGLE_API_KEY, DB_USER, and DB_PASS must be set in env")

    series.import_series()
    regions.import_regions()
    locations.import_locations()
    demographics.import_demographics()
    contacts.import_contacts()
    facts.import_facts()

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


# Process the data files.
def __import_data_from_sources(sources: [DataSource]) -> None:
    documents = {}
    for source in sources:
        print("Processing data file %s" % source.file)
        with open(source.file, encoding="utf8") as file:
            reader = csv.reader(file)
            for key, *data in reader:
                series = repository.find_series_by_key(source.series)
                series_key = "%s-%s" % (source.series, key)

                if series_key not in documents:
                    region = repository.find_region({"key": key})
                    if not region:
                        print("Failed to find region. key=%s" % key)
                        continue

                    document = {
                        "series_id": series["_id"],
                        "data": {},
                        "regions": [region[k] for k in ["_id", "parent_id"] if k in region]
                    }
                    documents[series_key] = document
                documents[series_key]["data"][source.component] = [0 if not n else float(n) if '.' in n else int(n) for n in data]

    repository.recreate_collection("data", documents)


if __name__ == '__main__':
    main()
