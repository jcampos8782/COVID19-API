import csv
from util.geolocation import resolve_location_by_address
from models import Location
from config import *


def main():
    __recreate_mexico_data_from_base()
    print("Complete!")


def __recreate_mexico_data_from_base() -> bool:
    states_to_iso = __load_states_with_iso_codes_from_file()
    locations = [resolve_location_by_address(state=state, region="Mexico") for state in states_to_iso]
    base_data = __load_base_data(states_to_iso)
    days_to_pad = (MX_PROCESSOR_DATA_START_DATE - SERIES_START_DATE).days - 1

    for source in MX_PROCESSOR_DATA_SOURCES:
        print("Creating data file %s" % source.file)
        with open(source.file, 'w+') as file:
            for location in locations:
                iso = states_to_iso[location.municipality]
                data = (['0'] * days_to_pad) + base_data[iso][source.component]
                file.write(format("%s,%s\n" % (__format_location(location), ",".join(data))))

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
        return {__get_formatted_state_name(state): iso for state, iso in csv.reader(file)}


def __get_formatted_state_name(name: str) -> str:
    return name if name not in GOOGLE_API_LOCATION_TEXT_FOR else GOOGLE_API_LOCATION_TEXT_FOR[name]


def __format_location(location: Location) -> str:
    return format("%s,%s,%s,%s" % (location.municipality, location.region, location.lat, location.lon))


if __name__ == '__main__':
    main()
