# COVID19-API

This project contains some simple APIs for querying and searching COVID-19 data published by the [John Hopkins School of Health](https://data.humdata.org/dataset/novel-coronavirus-2019-ncov-cases). I make no guarantees as to the accuracy of this data.

# Database

This project uses [MongoDB](http://mongodb.com) because of its geospatial indexing capabilities. 

## Schema

    {   
        date: Date of the data point,  
        cases: { 
            confirmed: Total number of confirmed cases, 
            deaths: Total number of reported deaths, 
            recovered: Total number of reported recoveries 
        }, 
        location: { 
            municipality: eg: Santa Clara County, 
            region: eg: US, 
            geo: { 
                type: Point,
                coordinates: [ lon, lat ] 
            } 
        }
    }

# Prerequisites

 1. Docker and docker-compose

# Build

    DB_USER, DB_PASS, docker-compose up -d

## Containers

This project creates two containers:

 1. MongoDB database (container name `mongo`)
 2. A `mongo-init` container which downloads the latest published data from the source and creates (or recreates) the `cvd19` database. This container will shut down upon completion.

## Updating the database

To update your database with the most up-to-date published data, just rebuild the project using `docker-compose up -d`

# License

[GNU GENERAL PUBLIC LICENSE](LICENSE)
