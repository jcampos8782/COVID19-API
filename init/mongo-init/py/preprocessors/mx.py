import csv
from config import *
import util.key_generator as keygen

def main():
    __recreate_mexico_data_from_base()
    print("Complete!")


def __recreate_mexico_data_from_base() -> bool:
    states_to_iso = __load_states_with_iso_codes_from_file()
    base_data = __load_base_data(states_to_iso)
    days_to_pad = (MX_PROCESSOR_DATA_START_DATE - SERIES_START_DATE).days - 1

    for source in MX_PROCESSOR_DATA_SOURCES:
        print("Creating data file %s" % source.file)
        with open(source.file, 'w+') as file:
            for state, iso in states_to_iso.items():
                data = (['0'] * days_to_pad) + base_data[iso][source.component]
                keys = keygen.generate_region_keys("%s,%s" % (state, "Mexico"))
                file.write(format("%s,%s\n" % (keys["region"], ",".join(data))))

    return True


def __load_base_data(state_to_iso: dict) -> dict:
    # Rows in the base data file are by date, not by country. Convert this to series data of state -> [data]
    # The date is implied by its position in the list
    base_data = {iso: {'confirmed': [], 'deaths': []} for iso in state_to_iso.values()}
    with open(MX_PROCESSOR_DATA_FILE, encoding="utf8") as file:
        # Map the codes to indices in the csv file
        reader = csv.reader(file)
        headings = next(reader)
        headings_idx = {headings[idx]: idx for idx in range(len(headings))}

        for [*data] in reader:
            for iso in base_data:
                c_key = format("%s%s" % (iso, MX_PROCESSOR_COLUMN_SUFFIXES['confirmed']))
                d_key = format("%s%s" % (iso, MX_PROCESSOR_COLUMN_SUFFIXES['deaths']))
                base_data[iso]['confirmed'].append(data[headings_idx[c_key]] or '0')
                base_data[iso]['deaths'].append(data[headings_idx[d_key]] or '0')

    return base_data


def __load_states_with_iso_codes_from_file() -> [str]:
    with open(MX_STATES_FILE, encoding="utf8") as file:
        return {state: iso for state, iso in csv.reader(file)}


if __name__ == '__main__':
    main()
