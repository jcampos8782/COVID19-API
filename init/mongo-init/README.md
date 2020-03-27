# Mongo-Init

This initialization script is designed for collections of time-series data which are bound to geographic locations. The
scripts creates three collections: 

 - regions: A collection of regions names with an optional `parent_id` which references a parent region.
 - locations: A geographic point associated with a region. 
 - series: A collection of data series with denormalized location information

Entries into the `series` collection are aggregated by region. In other words, there is only one entry in the `series` 
collection per region. However, there can be multiple series associated with a region. The series are collected into
the `data` field of the collection. 

For example, if the the series `confirmed` and `recovered` exist for a region, the document should contain fields 
`{ data: { confirmed: [...], recovered: [...] }}`.

# Environment Variables
 - `GOOGLE_API_KEY` (required) See [Prerequisites](#Prerequisites)
 - `DB_USER` (required) mongodb username
 - `DB_PASS` (required) mongodb password
 - `DB_HOST` mongodb host (default `localhost`)
 - `DB_PORT` mongodb port (default `27017`)
 - `DB_NAME` database name (default `cvd19`)
 
# To-Dos
 - There is no context for the collections. This could be added at a later point as a component of the data series.
 - Use the data series files for region/location creation and lookup
 
# Prerequisites

This script uses [Google's Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) to create
consistent regions names across data files. You must have a developer account with Google and an API key with permission 
access the geocoding service. 

# Conventions

## CSV Files

### data/series/\<series>.csv
These files contain the actual series data. Any files in this folder are assumed to be data series and will be processed
by this script.

This script expects series data files to be CSV files in the following format:

```
<sub-region name>, <region name>, <latitude>, <longitude>, <data> [, <data> ...]
```

The sub-region and region names will be used as defaults if Google's geocoding APIs fail to resolve the latitude and 
longitude coordinates. 

The filename will be used as a key in the associated Mongo document as the series type. For example, `data/series/confirmed.csv`
will have a `{ data: { confirmed: [...] }}` entry.

#### data/meta/coordinates.csv
This file should contain every region and set of coordinates contained within the individual series files. 

The coordinates file should be in the following format:

```
<sub-region name>, <region name>, <latitude>, <longitude>
```

# Schema

## `series`

 - `data` An array of data series for a location. Series are referenced by name within this data collection. 
 - `location` Denormalized location information. 
   - `_id` (required) id of location for reference
   - `region_id` (required) The topmost location
   - `municipality_id` (optional) A sub region

```json
    {   
        data: { 
            <name>: [...],
            ...
        }
        location: {
            "_id": ObjectId,
            "region_id": ObjectId
            "municipalityId": ObjectId
        }
    }
```

## `regions`

 - `name` Name of the region
 - `parent_id` (optional) A parent region's ID. 

```json
    {
        "name": <name>,
        "parent_id": ObjectId
    }
```

## `locations`
 - `key` A hashed key for quick lookups. This key should use a consistent hash function to resolve the same location to 
 the same document. For example, looking up "California, USA" should always resolve to the same
 location.
 - `geo` A [GeoJson](https://docs.mongodb.com/manual/reference/geojson/) object for geographic lookups. 
 - `region_id` The associated regions.
 
```json
    {
        "key": String,
        "geo": GeoJson,
        "region_id": ObjectId
    } 
```

# License

[GNU GENERAL PUBLIC LICENSE](LICENSE)
