import csv
from itertools import islice
from config import *
import util.key_generator as keygen


def process_downloads():
    print("Processing US data input files...")
    aggregates = {source.component: {} for source in US_PROCESSOR_DATA_SOURCES}
    written_keys = {source.component: set() for source in US_PROCESSOR_DATA_SOURCES}

    for source in US_PROCESSOR_DATA_SOURCES:
        print("Processing %s" % source.file)
        component = source.component
        with open("%s/%s_us.csv" % (OUTPUT_DIRECTORY, source.component), "w+") as out:
            with open(source.file, encoding="utf8") as file:
                for row in islice(csv.reader(file), 1, None):
                    name = row[US_PROCESSOR_COLUMN_DEFINITIONS[component]['name']]
                    for regex in DOWNLOADS_PROCESSOR_NAME_FILTER:
                        if regex.match(name):
                            break
                    else:
                        raw_key = row[US_PROCESSOR_COLUMN_DEFINITIONS[component]['key']]
                        data = row[US_PROCESSOR_COLUMN_DEFINITIONS[component]['data']:]
                        keys = keygen.generate_region_keys(raw_key)
                        parent_key = keys["parent"]

                        if parent_key not in aggregates[component]:
                            aggregates[component][parent_key] = [0] * len(data)

                        if keys["region"] not in written_keys[component]:
                            if keys["region"] not in US_PROCESSOR_FILTERED_KEYS:
                                written_keys[component].add(keys["region"])
                                out.write("%s,%s\n" % (keys["region"], ",".join(data)))
                            else:
                                print("Skipping filtered key %s" % parent_key)
                        else:
                            print("Detected duplicate key %s (parent: %s)" % (keys["region"], parent_key))

                        # Inconsistencies in timliness of reporting mean some municipalities don't report at the same interval
                        # Need to extend array if one municipality has reported more recent data than any others.
                        aggregates[component][parent_key] += [0] * (len(data) - len(aggregates[component][parent_key]))
                        aggregates[component][parent_key] = [aggregates[component][parent_key][i] + int(data[i].split('.')[0]) for i in range(len(data))]

            for parent_key in aggregates[component]:
                if parent_key not in written_keys[component]:
                    if parent_key not in US_PROCESSOR_FILTERED_KEYS:
                        out.write("%s,%s\n" % (parent_key,  ",".join(str(s) for s in aggregates[component][parent_key])))
                    else:
                        print("Skipping filtered key %s" % parent_key)
                else:
                    print("Skipping duplicate parent key %s " % parent_key)

    print("Import complete!")



