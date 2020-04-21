import csv
from itertools import islice
from config import *
import util.key_generator as keygen


def process_downloads():
    print("Processing US data input files...")
    aggregates = {source.component: {} for source in GLOBAL_PROCESSOR_DATA_SOURCES}

    for source in GLOBAL_PROCESSOR_DATA_SOURCES:
        print("Processing %s" % source.file)
        component = source.component
        with open("%s/%s_global.csv" % (OUTPUT_DIRECTORY, source.component), "w+") as out:
            with open(source.file, encoding="utf8") as file:
                for subregion, region, lat, lon, *data in islice(csv.reader(file), 1, None):
                    name = ",".join([s for s in (subregion, region) if s])

                    for regex in DOWNLOADS_PROCESSOR_NAME_FILTER:
                        if regex.match(name):
                            break
                    else:
                        keys = keygen.generate_region_keys(name)
                        parent_key = keys["parent"]
                        out.write("%s,%s\n" % (keys["region"], ",".join(data)))

                        if parent_key:
                            if parent_key not in aggregates[component]:
                                aggregates[component][parent_key] = [0] * len(data)

                            # Inconsistencies in timliness of reporting mean some municipalities don't report at the same interval
                            # Need to extend array if one municipality has reported more recent data than any others.
                            aggregates[component][parent_key] += [0] * (len(data) - len(aggregates[component][parent_key]))
                            aggregates[component][parent_key] = [aggregates[component][parent_key][i] + int(data[i].split('.')[0]) for i in range(len(data))]

            for parent_key in aggregates[component]:
                out.write("%s,%s\n" % (parent_key,  ",".join(str(s) for s in aggregates[component][parent_key])))

    print("Import complete!")


if __name__ == '__main__':
    process_downloads()