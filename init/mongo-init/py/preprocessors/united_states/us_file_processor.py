import csv
import util.geolocation as geo
from itertools import islice
from config import *

print("Processing US data input files...")
aggregates = {source.component: {} for source in US_PROCESSOR_DATA_SOURCES}
locations = {}

for source in US_PROCESSOR_DATA_SOURCES:
    print("Processing %s" % source.file)
    component = source.component
    with open(source.file, encoding="utf8") as file:
        for row in islice(csv.reader(file), 1, None):
            region = row[US_PROCESSOR_COLUMN_DEFINITIONS['region']]
            data = row[US_PROCESSOR_COLUMN_DEFINITIONS['data'][component]:]
            if region not in aggregates[component]:
                aggregates[component][region] = [0] * len(data)

            if region not in locations:
                location = geo.resolve_location_by_address(format("%s, United States") % region)
                if location:
                    locations[region] = {"lat": location.lat, "lng": location.lon}
                else:
                    print("Could not determine location for %s" % region)
                    locations[region] = {"lat": 0.0, "lng": 0.0}

            # Inconsistencies in timliness of reporting mean some municipalities don't report at the same interval
            # Need to extend array if one municipality has reported more recent data than any others.
            aggregates[component][region] += [0] * (len(data) - len(aggregates[component][region]))
            aggregates[component][region] = [aggregates[component][region][i] + int(data[i]) for i in range(len(data))]

    with open("%s/%s_us.csv" % (OUTPUT_DIRECTORY, source.component), "w+") as file:
        for region in aggregates[component]:
            location = locations[region]
            file.write("%s,%s,%.3f,%.3f,%s\n" % (region, "United States", location['lat'], location['lng'], ",".join(str(s) for s in aggregates[component][region])))

print("Import complete!")
