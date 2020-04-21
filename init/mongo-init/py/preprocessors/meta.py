"""
Preprocesses the raw download files and aggregates them for processing by the individual processors.

Outputs:
  - meta/regions.csv (processed by regions.py)
  - meta/demographics.csv (processed by demographics.py)
"""
import config as cfg
import csv
import json
from itertools import islice
from collections import namedtuple
import util.key_generator as keygen

Region = namedtuple("Region", "name level iso2 iso3 fips lat lon key parent population")


def main():
    regions = []

    print("Loading global regions from %s" % cfg.FILE_JHU_REGIONS)
    with open(cfg.FILE_JHU_REGIONS, encoding="utf8") as jhu_regions:
        reader = csv.reader(jhu_regions)

        for uid, iso2, iso3, code3, fips, county, state, country, lat, lon, key, population in islice(reader, 1, None):
            # Name is the finest grain of county/state/country.
            # Level is how far down the hierarchy the location exists
            name = county or state or country
            level = len([s for s in [county, state, country] if s])
            keys = keygen.generate_region_keys(key)

            # Avoid filtered locations
            for regex in cfg.DOWNLOADS_PROCESSOR_NAME_FILTER:
                if regex.match(name):
                    break
            else:
                if name in cfg.DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS:
                    name = cfg.DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS[name]

                regions.append(Region(name, level, iso2 or '', iso3 or '', fips or '', lat, lon, keys["region"], keys["parent"], population))

    print("Loading MX regions from %s" % cfg.FILE_MX_REGIONS)
    with open(cfg.FILE_MX_REGIONS, encoding="utf8") as mx_regions:
        for name, iso, lat, lon, population in csv.reader(mx_regions):
            keys = keygen.generate_region_keys(("%s,%s" % (name, "Mexico")))
            regions.append(Region(name, 2, '', iso, '', lat, lon, keys["region"], keys["parent"], population))

    print("Updating regions file %s" % cfg.FILE_REGIONS)
    with open(cfg.FILE_REGIONS, 'w+') as out_regions:
        for region in regions:
            out_regions.write("%s,%s,%s,%s,%s,%s,%s\n" % (region.name, region.key, region.parent, region.level, region.iso2, region.iso3, region.fips))

    print("Updating locations file %s" % cfg.FILE_LOCATIONS)
    with open(cfg.FILE_LOCATIONS, 'w+') as out_locations:
        for region in regions:
            out_locations.write("%s,%s,%s\n" % (region.key, region.lat or 0.0, region.lon or 0.0))

    print("Updating demographics file %s" % cfg.FILE_DEMOGRAPHICS)
    with open(cfg.FILE_DEMOGRAPHICS, 'w+') as out_demographics:
        for region in regions:
            out_demographics.write("%s,%s\n" % (region.key, region.population))

    print("Loading US state ISO codes from file %s" % cfg.FILE_US_STATES_AND_ISO_CODES)
    with open(cfg.FILE_US_STATES_AND_ISO_CODES, encoding="utf8") as state_codes:
        reader = csv.reader(state_codes)
        state_codes = {iso: keygen.generate_region_keys("%s,%s" % (state, "United States")) for state, iso in reader}

    print("Updating contacts from file %s" % cfg.FILE_COVID_TRACKER_STATES_META)
    with open(cfg.FILE_COVID_TRACKER_STATES_META, encoding="utf8") as states_meta:
        with open(cfg.FILE_CONTACTS, 'w+') as out_contacts:
            json.dump([__extract_meta(state_codes[i["state"]]["region"], i) for i in json.load(states_meta)], out_contacts)


def __extract_meta(key: str, data: dict) -> dict:
    return {'key': key, **{field: data[field] for field in cfg.COVID_TRACKING_PROCESSOR_META_FIELDS}}


if __name__ == '__main__':
    main()
