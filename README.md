# COVID19-API

This project contains some simple APIs for querying and searching COVID-19 data published by the [John Hopkins School of Health](https://data.humdata.org/dataset/novel-coronavirus-2019-ncov-cases). I make no guarantees as to the accuracy of this data.

# UI

Includes a minimalistic React/Redux UI which enables searching by the user's location or by a selected region.

# API

The web API generates swagger documentation which is accessible at /swagger-ui.html

# Database

This project uses [MongoDB](http://mongodb.com) because of its geospatial indexing capabilities.

## Schema
The schema contains three collections:

### `cases`
```
    {   
        date: Date of the data point,  
        cases: {
            confirmed: Total number of confirmed cases,
            deaths: Total number of reported deaths,
            recovered: Total number of reported recoveries
        },
        geo: {
            type: Point,
            coordinates: [ lon, lat ]
        } ,
        location: {
            municipality: eg: Santa Clara County,
            municipality_id: <id>,
            region: eg: US,
            region_id: <id>
        }
    }
```

### `regions`
```
    {
        name: eg: US
    }
```

### `municipalities`
```
    {
        name: eg: Santa Clara County
    }
```

# Prerequisites

 1. Docker and docker-compose

# Build

    For now, manually set the mongodb username and password in the app/src/main/resources/application.properties file.
    Then run

    ```
    DB_USER=<user> DB_PASS=<pass> docker-compose up -d
    ```

## Containers

This project creates three containers:

 1. A SpringBoot application which provides services over the dataset
 2. MongoDB database (container name `mongo`)
 3. A `mongo-init` container which downloads the latest published data from the source and creates (or recreates) the `cvd19` database. This container will shut down upon completion.

## Updating the database

To update your database with the most up-to-date published data, rebuild the mongo-init container and then run the container.

```
docker-compose build mongo-init
DB_USER=<user> DB_PASS=<pass> docker-compose up mongo-init
```

# License

[GNU GENERAL PUBLIC LICENSE](LICENSE)
