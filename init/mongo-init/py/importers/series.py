import csv
from config import *
import util.repository as repo


def import_series():
    print("Loading series and updating metadata...")
    with open(FILE_SERIES_DEFINITIONS, encoding="utf8") as file:
        for key, name, *cols in csv.reader(file):
            repo.create_or_update_series(key, name, cols)


if __name__ == '__main__':
    import_series()
