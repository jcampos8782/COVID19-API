# Mongo-Init

## Overview
This initialization script is designed for collections of time-series data which are bound to geographic locations. The
scripts creates three collections: 

 - regions: A collection of regions names with an optional `parent_id` which references a parent region.
 - locations: A geographic point associated with a region. Enables Geolocation lookups of regions
 - series: Series data associated with one or more regions

Entries into the `series` collection are aggregated by region. In other words, there is only one entry in the `series` 
collection per region. However, there can be multiple series associated with a region. The series are collected into
the `data` field of the collection. 

For example, if the the series `confirmed` and `recovered` exist for a region, the document should contain fields 
`{ data: { confirmed: [...], recovered: [...] }}`.

## Execution
### Prerequisites
This script uses [Google's Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) to create
consistent regions names across data files. You must have a developer account with Google and an API key with permission 
access the geocoding service. 

### Updating the data files
```shell script
cd scripts
./update_data.sh
```

### Updating MongoDB
```shell script
python3 py/import.py
```

Alternatively, you can build this as a Docker image and then run the container. 
```shell script
docker build . -
docker run <image>
```

### Environment Variables
 - `GOOGLE_API_KEY` (required) See [Prerequisites](#Prerequisites)
 - `DB_USER` (required) mongodb username
 - `DB_PASS` (required) mongodb password
 - `DB_HOST` mongodb host (default `localhost`)
 - `DB_PORT` mongodb port (default `27017`)
 - `DB_NAME` database name (default `cvd19`)

 
## Conventions

### CSV Files

#### data/processed/\<name>/\<component>.csv
The `processed` directory contains series data aggregated by series name. The `.csv` files contain data which describes
one component of the series.

For example, `data/processed/covid19/confirmed.csv` would contain time series data for confirmed COVID-19 cases.

These series files should be in the following format:

```
<sub-region name>, <region name>, <latitude>, <longitude>, <data> [, <data> ...]
```

The sub-region and region names will be used as defaults if Google's geocoding APIs fail to resolve the latitude and 
longitude coordinates. 

The filename will be used as a key in the associated Mongo document as the series type. For example, `/covid19/confirmed.csv`
will have a `{ data: { confirmed: [...] }}` entry in the `covid19` series.

#### data/meta/coordinates.csv
This file should contain every region and set of coordinates contained within the individual series files. 

The coordinates file should be in the following format:

```
<sub-region name>, <region name>, <latitude>, <longitude>
```

#### `series.csv`

```
<series-name>,<formatted-name>
```

Contains series metadata. The directory name should match the collection name in MongoDB. For example, a `data/processed/covid19`
directory should have a corresponding `data/meta/series.csv` entry of `covid19,COVID-19`. If a series name is not found,
it will be defaulted to the directory name.

## Schema

### `data`

 - `data` An array of data series for a location. Series are referenced by name within this data collection. 
 - `regions` (required) List of regions associated with this series.

```json
    {   
        data: { 
            <name>: [...],
            ...
        },
        "regions": [...]
    }
```

### `regions`

 - `name` Name of the region
 - `parent_id` (optional) A parent region's ID. 

```json
    {
        "name": <name>,
        "parent_id": ObjectId
    }
```

### `locations`
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
