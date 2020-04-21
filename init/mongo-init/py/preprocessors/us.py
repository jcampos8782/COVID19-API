import csv
from itertools import islice
from config import *
import util.key_generator as keygen


def main():
    print("Processing US data input files...")
    aggregates = {source.component: {} for source in US_PROCESSOR_DATA_SOURCES}

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

                        out.write("%s,%s\n" % (keys["region"], ",".join(data)))

                        # Inconsistencies in timliness of reporting mean some municipalities don't report at the same interval
                        # Need to extend array if one municipality has reported more recent data than any others.
                        aggregates[component][parent_key] += [0] * (len(data) - len(aggregates[component][parent_key]))
                        aggregates[component][parent_key] = [aggregates[component][parent_key][i] + int(data[i].split('.')[0]) for i in range(len(data))]

            for parent_key in aggregates[component]:
                out.write("%s,%s\n" % (parent_key,  ",".join(str(s) for s in aggregates[component][parent_key])))

    print("Import complete!")


if __name__ == '__main__':
    main()
