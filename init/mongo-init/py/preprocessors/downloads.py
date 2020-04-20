"""
Preprocesses the raw download files and aggregates them for processing by the individual processors.

Outputs:
  - meta/regions.csv (processed by regions.py)
  - meta/demographics.csv (processed by demographics.py)
"""
import config as cfg
import csv
from itertools import islice
from collections import namedtuple

Region = namedtuple("Region", "name parent iso2 iso3 fips lat lon population")


def main():
    regions = []

    print("Loading global regions from %s" % cfg.FILE_JHU_REGIONS)
    with open(cfg.FILE_JHU_REGIONS, encoding="utf8") as jhu_regions:
        reader = csv.reader(jhu_regions)

        for uid, iso2, iso3, code3, fips, locale, state, country, lat, lon, key, population in islice(reader, 1, None):
            # Name is the finest grain of locale/state/country.
            # Parent  is the name of the closest ancestor. Only set a parent on non countries
            name = locale or state or country
            parent = state if locale else country if state else ''

            # Avoid filtered locations
            for regex in cfg.DOWNLOADS_PROCESSOR_NAME_FILTER:
                if regex.match(name):
                    break
            else:
                if name in cfg.DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS:
                    name = cfg.DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS[name]

                if parent in cfg.DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS:
                    parent = cfg.DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS[parent]

                regions.append(Region(name, parent or '', iso2 or '', iso3 or '', fips or '', lat, lon, population))

    print("Loading MX regions from %s" % cfg.FILE_MX_REGIONS)
    with open(cfg.FILE_MX_REGIONS, encoding="utf8") as mx_regions:
        for name, iso, lat, lon, population in csv.reader(mx_regions):
            regions.append(Region(name, "Mexico", '', iso, '', lat, lon, population))

    print("Updating regions file %s " % cfg.FILE_REGIONS)
    with open(cfg.FILE_REGIONS, 'w+') as out_regions:
        for region in regions:
            out_regions.write("%s,%s,%s,%s,%s,%s,%s\n" % (region.name, region.parent, region.iso2, region.iso3, region.fips, region.lat, region.lon))

    print("Updating demographic data")
    with open(cfg.FILE_DEMOGRAPHICS, 'w+') as out_demographics:
        for region in regions:
            out_demographics.write("%s,%s,%s\n" % (region.name, region.parent, region.population))


if __name__ == '__main__':
    main()
