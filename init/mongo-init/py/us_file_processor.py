import csv
import requests
from itertools import islice
from config import *

print("Processing US data input files...")
aggregates = {file[0]: {} for file in US_PROCESSOR_INPUT_FILES}
locations = {}

for (series, filename) in US_PROCESSOR_INPUT_FILES:
    print("Processing %s" % filename)
    with open(filename, encoding="utf8") as file:
        for row in islice(csv.reader(file), 1, None):
            region = row[US_PROCESSOR_COLUMN_DEFINITIONS['region']]
            data = row[US_PROCESSOR_COLUMN_DEFINITIONS['data'][series]:]
            if region not in aggregates[series]:
                aggregates[series][region] = [0] * len(data)

            if region not in locations:
                print("Looking up location for %s" % region)
                response = requests.get(GEOCODE_ADDR_URL % (region, GOOGLE_API_KEY))
                results = response.json()['results']
                if results:
                    locations[region] = results[0]['geometry']['location']
                else:
                    print("Could not determine location for %s" % region)
                    locations[region] = {"lat": 0.0, "lng": 0.0}

            # Inconsistencies in timliness of reporting mean some municipalities don't report at the same interval
            # Need to extend array if one municipality has reported more recent data than any others.
            aggregates[series][region] += [0] * (len(data) - len(aggregates[series][region]))
            aggregates[series][region] = [aggregates[series][region][i] + int(data[i]) for i in range(len(data))]

    with open("%s/%s_us.csv" % (US_PROCESSOR_OUTPUT_FILE_DIR, series), "w+") as file:
        for region in aggregates[series]:
            location = locations[region]
            file.write("%s,%s,%.3f,%.3f,%s\n" % (region, "United States", location['lat'], location['lng'], ",".join(str(s) for s in aggregates[series][region])))

print("Import complete!")
