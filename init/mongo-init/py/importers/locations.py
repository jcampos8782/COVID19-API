import config as cfg
import csv
import util.repository as repo


def import_locations():
    print("Importing locations from %s" % cfg.FILE_LOCATIONS)
    with open(cfg.FILE_LOCATIONS, encoding="utf8") as regions_file:
        for key, lat, lon in csv.reader(regions_file):
            region = repo.find_region({'key': key})

            if not region:
                print("Could not find region %s" % key)
                continue

            repo.create_or_update_location(region["_id"], float(lat), float(lon))

    print("Location import complete!")


if __name__ == '__main__':
    import_locations()
