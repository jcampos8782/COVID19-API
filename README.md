# COVID19-API

This project includes components for downloading, indexing, querying, and browsing time series data.
The data sets currently being downloaded pertain to the COVID-19 pandemic. The set contains global data
indexed into MongoDB with geospatial indexes to allow for querying by location.

![Light](/screenshots/light.png)
![Dark](/screenshots/dark.png)

# UI

A React/Redux UI with [Nivo](http://nivo.rocks) chats. I use [Material-UI](http://material-ui.com) for component styling.

# API

A REST API using Java/SpringBoot with a Mongo connector. Generates swagger documentation.

# Database

This project uses [MongoDB](http://mongodb.com) because of its geospatial indexing capabilities.
See the [MongoDB](init/mongo-init) README for additional documentation

# Prerequisites

 1. Docker and docker-compose

# Build

  All components can be built using docker-compose.

    ```
    DB_USER=<user> DB_PASS=<pass> docker-compose up -d
    ```

## Containers

This project creates five containers:

 1. An Nginx proxy serving as an API gateway and reverse proxy to the UI and API containers
 2. The React/Redux UI
 3. A SpringBoot REST API  which provides services over the dataset
 4. MongoDB database (container name `mongo`)
 5. A `mongo-init` which will populate the mongo instance

## Updating the database

To update the database, run the provided update script and then rebuild and run the mongo-init container

```
./update_data.sh
docker-compose build mongo-init
DB_USER=<user> DB_PASS=<pass> docker-compose up mongo-init
```

# License

[GNU GENERAL PUBLIC LICENSE](LICENSE)
