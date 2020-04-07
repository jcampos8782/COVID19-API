import requests
from models import Location
from config import GOOGLE_API_KEY, GEOCODE_ADDR_URL, GEOCODE_COORD_URL


def resolve_location_by_coordinates(lat: float, lon: float) -> Location:
    response = __fetch_location_by_coordinates(lat, lon)
    if not response:
        return None

    region = __parse_region_from_response(response)
    if not region:
        return None

    municipality = __parse_municipality_from_response(response)
    return Location(lat, lon, region, municipality)


def resolve_location_by_address(address: str) -> Location:
    response = __fetch_location_by_address(address)
    if not response:
        return None

    coords = __parse_coords_from_response(response)
    region = __parse_region_from_response(response)
    municipality = __parse_municipality_from_response(response)
    return Location(coords.lat, coords.lng, region, municipality)


def __fetch_location_by_address(address: str) -> dict:
    print("Fetching location for address: %s" % address)
    response = requests.get(GEOCODE_ADDR_URL)
    if not response:
        raise Exception("Error fetching geolocation")
    return response.json()['results']


def __fetch_location_by_coordinates(lat: float, lon: float) -> dict:
    print("Fetching location for lat: %s lon: %s" % (lat, lon))
    response = requests.get(GEOCODE_COORD_URL % (lat, lon, GOOGLE_API_KEY))
    if not response:
        raise Exception("Error fetching geolocation")
    return response.json()['results']


def __parse_coords_from_response(response: dict) -> dict:
    return response[0]['geometry']['location']


def __parse_region_from_response(response: dict) -> str:
    region_component = [loc for loc in response if "country" in loc['types']]
    if region_component:
        return region_component[0]['address_components'][0]['long_name']


def __parse_municipality_from_response(response: dict) -> str:
    municipality_component = [loc for loc in response if "administrative_area_level_1" in loc['types']]
    if municipality_component:
        return municipality_component[0]['address_components'][0]['long_name']
