import csv
import util.geolocation as geo
from itertools import islice
from models import Location
from config import *


def main():
    print("Processing US data input files...")
    aggregates = {source.component: {} for source in US_PROCESSOR_DATA_SOURCES}
    locations = {}

    for source in US_PROCESSOR_DATA_SOURCES:
        print("Processing %s" % source.file)
        component = source.component
        with open(source.file, encoding="utf8") as file:
            for row in islice(csv.reader(file), 1, None):
                state = row[US_PROCESSOR_COLUMN_DEFINITIONS['state']]
                data = row[US_PROCESSOR_COLUMN_DEFINITIONS['data'][component]:]
                if state not in aggregates[component]:
                    aggregates[component][state] = [0] * len(data)

                if state not in locations:
                    location = geo.resolve_location_by_address(state=state, region="United States")
                    if location:
                        locations[state] = location
                    else:
                        print("Could not determine location for %s" % state)
                        locations[state] = Location(0.0, 0.0, state, "United States")

                # Inconsistencies in timliness of reporting mean some municipalities don't report at the same interval
                # Need to extend array if one municipality has reported more recent data than any others.
                aggregates[component][state] += [0] * (len(data) - len(aggregates[component][state]))
                aggregates[component][state] = [aggregates[component][state][i] + int(data[i]) for i in range(len(data))]

        with open("%s/%s_us.csv" % (OUTPUT_DIRECTORY, source.component), "w+") as file:
            for state in aggregates[component]:
                location = locations[state]
                file.write("%s,%s,%s,%s,%s\n" % (state, "United States", location.lat, location.lon, ",".join(str(s) for s in aggregates[component][state])))

    print("Import complete!")


if __name__ == '__main__':
    main()
