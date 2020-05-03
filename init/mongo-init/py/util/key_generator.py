import config as cfg


def generate_region_keys(key: str) -> {}:
    # Replace crap in the keys
    for to_replace, replacement in cfg.DOWNLOADS_PROCESSOR_NAME_REPLACEMENTS.items():
        key = key.replace(to_replace, replacement)

    return {
        'region': __keyify__(key),
        'parent': __keyify__(key[key.index(',') + 1:] if ',' in key else '')
    }


# TODO: regex
def __keyify__(key: str) -> str:
    return key.strip()\
        .replace(', ', ',')\
        .replace(' ,', ',')\
        .replace(' ', '_')\
        .replace('/', '_')\
        .replace(',', '-')\
        .replace('(', '')\
        .replace(')', '')\
        .lower()
