import csv
import json
from config import *
from util.key_generator import generate_region_keys


def process_downloads():
    with open(FILE_US_STATES_AND_ISO_CODES, encoding="utf8") as state_codes:
        reader = csv.reader(state_codes)
        state_codes = {iso: generate_region_keys("%s,%s" % (state, "United States")) for state, iso in reader}

    facts = []
    print("Updating state facts from file %s" % FILE_COVID_TRACKER_STATES_CURRENT)
    with open(FILE_COVID_TRACKER_STATES_CURRENT, encoding="utf8") as states_current:
        facts += [__extract_state_facts(state_codes[i["state"]]["region"], i) for i in json.load(states_current)]

    print("Updating US facts from file %s" % FILE_COVID_TRACKER_US_CURRENT)
    with open(FILE_COVID_TRACKER_US_CURRENT, encoding="utf8") as us_current:
        facts.append(__extract_us_facts(json.load(us_current)[0]))

    print("Creating facts file %s" % FILE_FACTS)
    with open(FILE_FACTS, 'w+') as out_facts:
        json.dump(facts, out_facts)


def __extract_us_facts(data: dict) -> dict:
    return __extract_facts(generate_region_keys("United States")["region"], data, COVID_TRACKING_PROCESSOR_US_FIELDS)


def __extract_state_facts(key: str, data: dict) -> dict:
    return __extract_facts(key, data, COVID_TRACKING_PROCESSOR_STATE_FIELDS)


def __extract_facts(key: str, data: dict, fields: list) -> dict:
    return {'key': key, 'facts': {__get_field_name(field): data[field] for field in fields}}


def __get_field_name(fld: str) -> str:
    return fld if fld not in COVID_TRACKING_FACT_FIELDS else COVID_TRACKING_FACT_FIELDS[fld]


if __name__ == '__main__':
    process_downloads()
