import requests
import csv
from models import Location
from config import *


def resolve_location_by_coordinates(lat: float, lon: float) -> Location:
    response = __fetch_location_by_coordinates(lat, lon)
    if not response:
        return None

    region = __parse_region_from_response(response)
    if not region:
        return None

    municipality = __parse_municipality_from_response(response)
    return Location(lat, lon, region, municipality)


def resolve_location_by_address(state: str, region: str, cache={}) -> Location:
    if not cache:
        with open(FILE_GEO_COORDINATES, encoding="utf8") as file:
            reader = csv.reader(file)
            for s, r, lat, lon in reader:
                cache[s] = Location(lat, lon, r, s)

    g_state = __get_google_name(state)
    if g_state in cache:
        return cache[g_state]

    address = "%s, %s" % (state, region) if region else state

    print("Requesting location from Google API: %s" % address)
    response = requests.get(GOOGLE_API_GEOCODE_ADDR_URL % (address, GOOGLE_API_KEY))
    if not response:
        raise Exception("Error fetching geolocation")

    json = response.json()
    if json['status'] == 'ZERO_RESULTS':
        print("Failed to resolve location.")
        cache[g_state] = None
        return None

    if json['status'] == 'REQUEST_DENIED':
        raise Exception("Geolocation API request denied. %s" % json['error_message'])

    result = json['results'][0]
    coords = __parse_coords_from_response(result)
    region = __parse_region_from_response(result)
    municipality = __parse_municipality_from_response(result)
    location = Location(coords['lat'], coords['lng'], region, municipality)
    cache[g_state] = location
    return location


def __fetch_location_by_coordinates(lat: float, lon: float) -> dict:
    print("Fetching location for lat: %s lon: %s" % (lat, lon))
    response = requests.get(GOOGLE_API_GEOCODE_COORD_URL % (lat, lon, GOOGLE_API_KEY))
    if not response:
        raise Exception("Error fetching geolocation")

    json = response.json()
    if json['status'] == 'ZERO_RESULTS':
        print("Failed to resolve location.")
        return None

    if json['status'] == 'REQUEST_DENIED':
        raise Exception("Geolocation API request denied. %s" % json['error_message'])

    return json['results'][0]


def __parse_coords_from_response(response: dict) -> dict:
    return response['geometry']['location']


def __parse_region_from_response(response: dict) -> str:
    address_components = response["address_components"]
    region_component = [loc for loc in address_components if "country" in loc['types']]
    if region_component:
        return region_component[0]['long_name']


def __parse_municipality_from_response(response: dict) -> str:
    address_components = response["address_components"]
    municipality_component = [loc for loc in address_components if "administrative_area_level_1" in loc['types']]
    if municipality_component:
        return municipality_component[0]['long_name']


def __get_google_name(name: str) -> str:
    return name if name not in GOOGLE_API_LOCATION_TEXT_FOR else GOOGLE_API_LOCATION_TEXT_FOR[name]