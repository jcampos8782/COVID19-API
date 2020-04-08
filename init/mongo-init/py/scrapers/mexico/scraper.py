import requests
import csv
from hashlib import md5
from bs4 import BeautifulSoup, element
from bs4.element import Tag
from os.path import dirname, join
from geolocation import resolve_location_by_address
from models import Location, DataSource
from datetime import date

script_dir = dirname(__file__)
series_start_date = date(2020, 1, 21)

file_dir = join(script_dir, "../../../data/downloads/wikipedia/mexico")
base_data_file = join(script_dir, '../../../data/downloads/github/carranco-sga/mx_data.csv')
output_dir = join(script_dir, '../../../data/processed/covid19')

hash_file = join(script_dir, "hash.txt")
state_file = join(script_dir, "states.csv")
locations_file = join(script_dir, "locations.csv")
parser = "lxml"
url = "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Mexico"

data_sources = [
    DataSource("covid19", "confirmed", join(output_dir, "confirmed_mx.csv")),
    DataSource("covid19", "deaths", join(output_dir, "deaths_mx.csv"))
]

base_data_file_start_date = date(2020, 1, 23)
base_data_column_suffixes = {
    'confirmed': '',
    'deaths': '_D'
}

# Information on each location for helping parse the page. Includes replacement text for
# name to heading mismatches, the expected number of rows containing data, and any offsets into the row
# results in order to properly process the data. No key means defaults are all expected.
misspellings = {
    'San Luis Potosi': 'San Luis Potosí',
    'Nuevo Leon': 'Nuevo León'
}

# Take the nth row
offsets = {
    'default': 0,
    'Mexico City': 1
}

# Baja California Sur makes 'Baja California' come up twice
expected_result_count = {
    'default': 2,
    'Mexico City': 3,
    'Baja California': 4
}

# Google APIs sometimes resolve to slight differences in name
location_replacements = {
    'Yucatán': 'Yucatan',
    'Nuevo León': 'Nuevo Leon',
    'Michoacan': 'Michoacán',
    'Queretaro': 'Querétaro'
}


def main():
    # To recreate the data templates, uncomment this line
    __recreate_mexico_data_from_base() and exit(0)

    # Ensure the data has change
    print("Loading html from %s" % url)
    html = __scrape(url)

    print("Checking for updates...")
    new_hash = __ensure_data_has_changed_or_quit(html)

    print("Loading existing data from files...")
    data = __load_data()

    print("Parsing page for updates to data")
    for location in data:
        new_data = __parse_data_from_html(location, html)
        data[location]['series']['confirmed'].append(new_data['confirmed'])
        data[location]['series']['deaths'].append(new_data['deaths'])

    print("Updating data files")
    __update_data_files(data)

    print("Updating hash file...")
    __update_hash_text(new_hash)

    print("Complete!")


def __update_data_files(data):
    for source in data_sources:
        with open(source.file, 'w') as file:
            for location in data:
                formatted_location = __format_location(data[location]['location'])
                file.write("%s,%s\n" % (formatted_location, ",".join(data[location]['series'][source.component])))


def __update_hash_text(new_hash: str) -> None:
    with open(hash_file, 'w') as file:
        file.write(new_hash)


def __load_data() -> dict:
    locations = {}
    for source in data_sources:
        with open(source.file, encoding="utf8") as file:
            reader = csv.reader(file)
            for state, region, lat, lon, *data in reader:
                if state not in locations:
                    locations[state] = {
                        'location': Location(lat, lon, region, state),
                        'series': {}
                    }
                locations[state]['series'][source.component] = data
    return locations


def __load_states_with_iso_codes_from_file() -> [str]:
    with open(state_file, encoding="utf8") as file:
        return {__get_formatted_state_name(state): iso for state, iso in csv.reader(file)}


def __scrape(address: str) -> dict:
    response = requests.get(address)
    if not response:
        raise AssertionError("No response from %s" % address)

    with open(join(file_dir, "index.html"), 'w') as file:
        file.write(response.text)

    soup = BeautifulSoup(response.text, parser)
    return soup


def __parse_data_from_html(location: str, html: BeautifulSoup) -> dict:
    return __parse_data_from_rows(__find_row_for_location(location, html))


def __parse_data_from_rows(rows: Tag) -> dict:
    cells = rows.find_all('td')
    if len(cells) != 3:
        raise AssertionError("Unexpected cells: %s" % str(cells))
    return {'confirmed': cells[0].text, 'deaths': cells[1].text}


def __find_row_for_location(location: str, html: BeautifulSoup) -> []:
    name = location if location not in misspellings else misspellings[location]
    expected = __get_expected_results_for_location(location)
    offset = __get_offset_into_result_set_for_location(location)

    rows = list(filter(lambda e: name in str(e), html.find_all('tr')))

    if len(rows) != expected:
        raise AssertionError(format("Expected rows not returned for location %s. Expected %d, Got %d" % (location, expected, len(rows))))

    return rows[offset]


def __ensure_data_has_changed_or_quit(html: BeautifulSoup) -> str:
    tags = html.find_all("big")
    if not tags:
        raise AssertionError("Could not locate date element on page.")

    if "As of" not in tags[0].text:
        raise AssertionError("Expected to find 'As of <date>' in element but found '%s'" % tags[0].text)

    update_hash = md5(tags[0].text.encode()).hexdigest()
    with open(hash_file, encoding="utf8") as file:
        existing_hash = file.readline()
        if existing_hash == update_hash:
            print("Data has not been updated. Last update: %s" % tags[0].text)
            exit(0)

    print("New version found. %s (hash=%s)" % (tags[0].text, update_hash))
    return update_hash


def __get_expected_results_for_location(loc: str) -> int:
    return expected_result_count['default'] if loc not in expected_result_count else expected_result_count[loc]


def __get_offset_into_result_set_for_location(loc: str) -> int:
    return offsets['default'] if loc not in offsets else offsets[loc]


def __format_location(location: Location) -> str:
    return format("%s,%s,%s,%s" % (location.municipality, location.region, location.lat, location.lon))


def __get_formatted_state_name(name: str) -> str:
    return name if name not in location_replacements else location_replacements[name]


def __recreate_mexico_data_from_base() -> bool:
    states_to_iso = __load_states_with_iso_codes_from_file()
    locations = [__lookup_location(state) for state in states_to_iso]

    with open(locations_file, 'w+') as file:
        for location in locations:
            file.write(format("%s\n" % __format_location(location)))

    base_data = __load_base_data(states_to_iso)
    days_to_pad = (base_data_file_start_date - series_start_date).days - 1

    for source in data_sources:
        print("Creating data file %s" % source.file)
        with open(source.file, 'w+') as file:
            for location in locations:
                iso = states_to_iso[location.municipality]
                data = (['0'] * days_to_pad) + base_data[iso][source.component]
                file.write(format("%s,%s\n" % (__format_location(location), ",".join(data))))

    return True


def __lookup_location(state: str, cache={}) -> Location:
    # Try to find this location in the file
    if not cache:
        with open(locations_file, encoding="utf8") as file:
            reader = csv.reader(file)
            for state, region, lat, lon in reader:
                cache[state] = Location(lat, lon, region, state)

    # Some lookups resolve to a different name
    cached_name = __get_formatted_state_name(state)
    if cached_name in cache:
        return cache[cached_name]

    location = resolve_location_by_address("%s, %s" % (state, 'Mexico'))
    cache[cached_name] = location
    return location


def __load_base_data(state_to_iso: dict) -> dict:
    # Rows in the base data file are by date, not by country. Convert this to series data of state -> [data]
    # The date is implied by its position in the list
    base_data = {iso: {'confirmed': [], 'deaths': []} for iso in state_to_iso.values()}
    with open(base_data_file, encoding="utf8") as file:
        # Map the codes to indices in the csv file
        reader = csv.reader(file)
        headings = next(reader)
        headings_idx = {headings[idx]: idx for idx in range(len(headings))}

        for [*data] in reader:
            for iso in base_data:
                c_key = format("%s%s" % (iso, base_data_column_suffixes['confirmed']))
                d_key = format("%s%s" % (iso, base_data_column_suffixes['deaths']))
                base_data[iso]['confirmed'].append(data[headings_idx[c_key]] or '0')
                base_data[iso]['deaths'].append(data[headings_idx[d_key]] or '0')

    return base_data


main()
