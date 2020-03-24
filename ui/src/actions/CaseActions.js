import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestCasesByGeolocation = (coords) => {
    return { type: Actions.REQUEST_CASES_BY_GEOLOCATION, coords };
}

export const requestCasesByRegion = (regionId) => {
    return { type: Actions.REQUEST_CASES_BY_REGION_ID, regionId };
}

export const receiveCases = (cases) => {
    return {
        type: Actions.RECEIVE_CASES,
        cases
    };
}

export function fetchCasesByGeolocation(coords) {
    return dispatch => {
        dispatch(requestCasesByGeolocation(coords));
        return fetch(`${SERVER_URL}/api/covid19/cases/geo?lat=${coords.latitude}&lon=${coords.longitude}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveCases(json)));
    }
}

export function fetchCasesByRegion(regionId) {
    return dispatch => {
        dispatch(requestCasesByRegion(regionId));
        return fetch(`${SERVER_URL}/api/covid19/cases/regions/${regionId}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveCases(json)));
    }
}
