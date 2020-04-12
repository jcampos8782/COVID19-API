import csv
import util.repository as repository
from config import *


def main():
    created = 0
    with open(FILE_US_COUNTIES) as file:
        states = {}
        for county, state, lat, lon in csv.reader(file):
            if state not in states:
                # load region id for the state
                state_region = repository.find_region({"name": state})
                if not state_region:
                    print("State not found: %s. Skipping row for county %s" % (state, county))
                    continue
                states[state] = state_region

            parent_region = states[state]
            county_region_id = repository.find_or_create_subregion(county, parent_region["_id"])
            location = repository.find_location(state, county)
            if not location:
                created += 1
                repository.create_location(state, county, float(lat), float(lon), county_region_id)

    print("Created %s new locations" % str(created))


if __name__ == '__main__':
    main()
