import config as cfg
import csv
import json
import util.key_generator as keygen


def process_downloads():
    print("Loading US state ISO codes from file %s" % cfg.FILE_US_STATES_AND_ISO_CODES)
    with open(cfg.FILE_US_STATES_AND_ISO_CODES, encoding="utf8") as state_codes:
        reader = csv.reader(state_codes)
        state_codes = {iso: keygen.generate_region_keys("%s,%s" % (state, "United States")) for state, iso in reader}

    print("Updating contacts from file %s" % cfg.FILE_COVID_TRACKER_STATES_META)
    with open(cfg.FILE_COVID_TRACKER_STATES_META, encoding="utf8") as states_meta:
        with open(cfg.FILE_CONTACTS, 'w+') as out_contacts:
            json.dump([__extract_meta(state_codes[i["state"]]["region"], i) for i in json.load(states_meta)], out_contacts)


def __extract_meta(key: str, data: dict) -> dict:
    return {'key': key, 'contacts': {fld: data[orig] for orig, fld in cfg.COVID_TRACKING_PROCESSOR_META_FIELDS.items()}}


if __name__ == '__main__':
    process_downloads()
