import config as cfg
import csv
import util.repository as repo


def import_demographics():
    print("Importing demographics from %s" % cfg.FILE_DEMOGRAPHICS)
    with open(cfg.FILE_DEMOGRAPHICS, encoding="utf8") as demographics_file:
        for key, population in csv.reader(demographics_file):
            region = repo.find_region({'key': key})

            if not region:
                print("Could not find region %s" % key)
                continue

            repo.create_or_update_demographics(region["_id"], {'population': int(population) if population.isnumeric() else None})

    print("Demographic import complete!")


if __name__ == '__main__':
    import_demographics()
