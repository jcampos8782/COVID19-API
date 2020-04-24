import config as cfg
import json
import util.repository as repo


def import_facts():
    print("Importing facts from %s" % cfg.FILE_FACTS)
    with open(cfg.FILE_FACTS, encoding="utf8") as facts_file:
        for fact in json.load(facts_file):
            region = repo.find_region({"key": fact["key"]})
            if not region:
                print("Could not locate region %s" % fact["key"])
                continue

            repo.create_or_update_facts(region["_id"], fact["facts"])

    print("Facts import complete!")


if __name__ == '__main__':
    import_facts()
