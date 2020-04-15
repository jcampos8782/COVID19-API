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
        "cols": []
    }).inserted_id


def update_series(series: dict, query: dict) -> None:
    db["series"].update_one(series, query)


def create_location(region: str, municipality: str, lat: float, lon: float, region_id: str) -> str:
    return db['locations'].insert_one({
            "key": __generate_location_key(region, municipality),
            "geo": __generate_point(lat, lon),
            "region_id": region_id
        }).inserted_id


def find_location(region: str, municipality: str) -> dict:
    return db['locations'].find_one({'key': __generate_location_key(region, municipality)})


def find_or_create_region(name: str) -> str:
    region = find_region({"name": name})
    if region:
        return region["_id"]
    else:
        print("Creating region: %s" % name.encode('utf-8'))
        return create_region({"name": name})


def find_or_create_subregion(name: str, parent_id: str) -> int:
    region = find_region({"name": name, "parent_id": parent_id})
    if region:
        return region["_id"]
    else:
        print("Creating subregion: %s for parent: %s" % (name.encode('utf-8'), parent_id))
        return create_region({"name": name, "parent_id": parent_id})


def create_region(document: dict) -> str:
    return db['regions'].insert_one(document).inserted_id


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


def __generate_location_key(region: str, municipality: str) -> str:
    return hashlib.md5(format("%s-%s" % ((municipality.lower()), region.lower())).encode()).hexdigest()


def __generate_point(lat: float, lon: float) -> dict:
    return {"type": "Point", "coordinates": [lon, lat]}