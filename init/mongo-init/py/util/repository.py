import hashlib
import pymongo
from config import MONGO_CONNECTION_STR, DB_NAME

db = pymongo.MongoClient(MONGO_CONNECTION_STR)[DB_NAME]


def create_or_update_series(key: str, name: str, cols: []) -> str:
    series = db["series"].find_one({"key": __generate_series_key(key)})
    if series:
        update_series(series, {"$set": {"cols": cols, 'name': name}})
        return series["_id"]

    print("Creating new series %s" % name)
    return create_series(key, name, cols)


def find_series_by_key(key: str) -> dict:
    return db["series"].find_one({"key": __generate_series_key(key)})


def create_series(key: str, name: str, cols: []) -> int:
    return db['series'].insert_one({
        "key": __generate_series_key(key),
        "name": name,
        "cols": cols
    }).inserted_id


def update_series(series: dict, query: dict) -> None:
    db["series"].update_one(series, query)


def create_or_update_location(region_id: str, lat: float, lon:float) -> None:
    location = db['locations'].find_one({'region_id': region_id})
    if location:
        db['locations'].update_one(location, { "$set": { "geo": __generate_point(lat, lon) }})
    else:
        db['locations'].insert_one({ 'region_id': region_id, 'geo': __generate_point(lat,lon)})


def create_or_update_demographics(region_id: str, demographics: dict) -> str:
    d = db["demographics"].find_one({"region_id": region_id})
    if not d:
        return db["demographics"].insert_one({"region_id": region_id, **demographics}).inserted_id
    else:
        db["demographics"].update_one(d, {"$set": {**demographics}})
        return d["_id"]


def create_or_update_facts(region_id: str, facts: dict) -> str:
    d = db["facts"].find_one({"region_id": region_id})
    if not d:
        return db["facts"].insert_one({"region_id": region_id, **facts}).inserted_id
    else:
        db["facts"].update_one(d, {"$set": {**facts}})
        return d["_id"]


def create_or_update_contacts(region_id: str, contacts: dict) -> str:
    d = db["contacts"].find_one({"region_id": region_id})
    if not d:
        return db["contacts"].insert_one({"region_id": region_id, **contacts}).inserted_id
    else:
        db["contacts"].update_one(d, {"$set": {**contacts}})
        return d["_id"]


def create_region(document: dict) -> str:
    return db['regions'].insert_one(document).inserted_id


def update_region(region: dict, data: dict) -> None:
    db["regions"].update_one(region, {"$set": {**data}})


def find_region(criteria: dict) -> dict:
    return db["regions"].find_one(criteria)


def recreate_collection(collection: str, documents: [dict]) -> int:
    print("Recreating collection %s" % collection)
    inserted = 0
    db.drop_collection(collection)
    for doc in documents.values():
        db[collection].insert_one(doc)
        inserted += 1
    print("Inserted %d documents" % inserted)
    return inserted


def create_indices(indices: tuple) -> None:
    for index in indices:
        print("Creating %s index on field %s for collection %s" % (index.type, index.field, index.collection))
        db[index.collection].create_index([(index.field, index.type)])


def __generate_series_key(key: str) -> str:
    return hashlib.md5(key.encode()).hexdigest()


def __generate_point(lat: float, lon: float) -> dict:
    return {"type": "Point", "coordinates": [lon, lat]}