"""
A unified processor for importing and updating regions.
Expects a file format of:
region,key,parent-key,level,iso2,iso3,fips,lat,lon
"""
import config as cfg
import csv
import util.repository as repo


def import_regions():
    print("Importing regions from %s" % cfg.FILE_REGIONS)
    retries = []
    with open(cfg.FILE_REGIONS, encoding="utf8") as regions_file:
        for row in csv.reader(regions_file):
            if not __import_row__(row):
                retries.append(row)

    if retries:
        print("Retrying failed imports")
        for row in retries:
            if not __import_row__(row):
                print("Could not import region %s (key=%s)" % (row[0], row[1]))

    print("Region import complete!")


def __import_row__(row: tuple) -> bool:
    name, key, parent_key, level, iso2, iso3, fips = row
    parent = repo.find_region({'key': parent_key}) if parent_key else None

    if parent_key and not parent:
        print("Parent does not exist for region %s (parent_key=%s)." % (name, parent_key))
        return False

    props = {'key': key, 'name': name, 'iso2': iso2, 'iso3': iso3, 'fips': fips}
    criteria = {"key": key}

    if parent:
        criteria["parent_id"] = parent["_id"]
        props["parent_id"] = parent["_id"]

    region = repo.find_region(criteria)

    if region:
        repo.update_region(region, props)
    else:
        print("Creating new region %s (key=%s)" % (name, key))
        repo.create_region(props)

    return True


if __name__ == '__main__':
    import_regions()
