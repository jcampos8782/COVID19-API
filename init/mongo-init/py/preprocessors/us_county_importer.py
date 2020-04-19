import csv
import util.repository as repository
from config import *


def main():
    create_us_counties()


def create_us_counties():
    created = 0
    # Ensure US exists
    us_region = repository.find_or_create_region("United States")

    with open(FILE_US_COUNTIES) as file:
        states = {}
        state_populations = {}
        for county, state, lat, lon, population in csv.reader(file):
            if state not in states:
                # load region id for the state
                state_region = repository.find_or_create_subregion(state, us_region)
                if not state_region:
                    print("State not found: %s. Skipping row for county %s" % (state, county))
                    continue
                states[state] = state_region

            parent_region = states[state]
            county_region_id = repository.find_or_create_subregion(county, parent_region)

            if population:
                if not population.isnumeric():
                    print("Population for region %s is not numeric: %s" % (county, population))
                repository.create_or_update_demographics(county_region_id, {"population": int(population)})
                if parent_region not in state_populations:
                    state_populations[parent_region] = 0
                state_populations[parent_region] += int(population)

            location = repository.find_location(state, county)
            if not location:
                created += 1
                repository.create_location(state, county, float(lat), float(lon), county_region_id)

        us_population = 0
        for state in state_populations:
            print(state_populations[state])
            population = state_populations[state]
            us_population += population
            repository.create_or_update_demographics(state, {"population": int(population)})

        repository.create_or_update_demographics(us_region, {"population": int(us_population)})

    print("Created %s new locations" % str(created))


if __name__ == '__main__':
    main()
