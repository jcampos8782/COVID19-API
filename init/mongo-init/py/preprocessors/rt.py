import csv
from itertools import islice
from config import *
import util.key_generator as keygen


def process_downloads():
    # Generate keys for all the series for each state. Lookup iso -> state to create region key
    with open(FILE_US_STATES_AND_ISO_CODES, encoding="utf8") as lookups:
        iso_to_state = {iso: state for state, iso in csv.reader(lookups)}

    # Convert to time series data
    print("Breaking down RT time-series components")
    with open(FILE_RT_LIVE, encoding="utf8") as rt_data:
        series_data = {
            "mean": {}, "median": {}, "upper_90": {}, "lower_90": {}, "upper_50": {}, "lower_50": {}
        }

        for _, iso, mean, median, lower_90, upper_90, lower_50, upper_50, __ in islice(csv.reader(rt_data), 1, None):
            state = iso_to_state[iso]
            key = keygen.generate_region_keys("%s,%s" % (state, "United States"))["region"]

            for series in series_data:
                if key not in series_data[series]:
                    series_data[series][key] = []

            series_data["mean"][key].append(mean)
            series_data["median"][key].append(median)
            series_data["upper_90"][key].append(upper_90)
            series_data["lower_90"][key].append(lower_90)
            series_data["upper_50"][key].append(upper_50)
            series_data["lower_50"][key].append(lower_50)

    # Convert keys to individual files
    print(series_data)
    for series in series_data:
        filename = join(FILE_RT_LIVE_OUTPUT_DIR, ("%s.csv" % series))
        print("Creating time series file %s" % filename)
        with open(filename, 'w+') as out:
            for key in series_data[series]:
                out.write("%s,%s\n" % (key, ",".join(series_data[series][key])))

    print("Complete")


if __name__ == '__main__':
    process_downloads()
