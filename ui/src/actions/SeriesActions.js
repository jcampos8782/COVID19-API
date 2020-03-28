import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestSeriesByGeolocation = (coords) => {
    return { type: Actions.REQUEST_SERIES_BY_GEOLOCATION, coords };
}

export const requestSeriesByRegion = (regionId) => {
    return { type: Actions.REQUEST_SERIES_BY_REGION_ID, regionId };
}

export const receiveSeries = (series) => {
    return {
        type: Actions.RECEIVE_SERIES,
        series
    };
}

export function fetchSeriesByGeolocation(coords) {
    return dispatch => {
        dispatch(requestSeriesByGeolocation(coords));
        return fetch(`${SERVER_URL}/api/series/geo?lat=${coords.latitude}&lon=${coords.longitude}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveSeries(json)));
    }
}

export function fetchCasesByRegion(regionId) {
    return dispatch => {
        dispatch(requestSeriesByRegion(regionId));
        return fetch(`${SERVER_URL}/api/series/regions/${regionId}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveSeries(json)));
    }
}
