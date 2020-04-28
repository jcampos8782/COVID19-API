import requests
from bs4 import BeautifulSoup
from models import Location
from config import *
from util import key_generator


def main():
    # Ensure the data has change
    print("Loading html from %s" % SIP_SCRAPER_URL)
    html = __scrape(SIP_SCRAPER_URL)
    rows = html.find('table').find_all('tr')
    cells = [row.find_all('td') for row in rows]
    cells = [cell for cell in cells if cell]
    data = {cell[0].text: cell[3].text for cell in cells}

    with open(FILE_SIP_ORDERS, 'w+') as file:
        for state, sip_order_date in data.items():
            file.write("%s,%s\n" % (key_generator.generate_region_keys("%s,%s" % (state.strip(), "United States"))["region"], sip_order_date))

    print("Complete!")


def __scrape(address: str) -> dict:
    response = requests.get(address)
    if not response:
        raise AssertionError("No response from %s" % address)

    with open(join(SIP_SCRAPER_DOWNLOAD_DIRECTORY, "index.html"), 'w+') as file:
        file.write(response.text)

    soup = BeautifulSoup(response.text, SIP_SCRAPER_PARSER)
    return soup


def __format_location(location: Location) -> str:
    return format("%s,%s,%s,%s" % (location.municipality, location.region, location.lat, location.lon))


if __name__ == '__main__':
    main()
