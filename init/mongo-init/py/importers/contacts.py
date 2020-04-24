import config as cfg
import json
import util.repository as repo


def import_contacts():
    print("Importing contacts from %s" % cfg.FILE_CONTACTS)
    with open(cfg.FILE_CONTACTS, encoding="utf8") as contacts_file:
        for contact in json.load(contacts_file):
            region = repo.find_region({"key": contact["key"]})
            if not region:
                print("Could not locate region %s" % contact["key"])
                continue

            repo.create_or_update_contacts(region["_id"], contact["contacts"])

    print("Contact import complete!")


if __name__ == '__main__':
    import_contacts()
