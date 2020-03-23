import * as Actions from './types';

export function requestGeolocation() {
    return { type: Actions.REQUEST_GEOLOCATION };
}

export function receiveGeolocation(coords) {
    console.log(coords);
    return { type: Actions.RECEIVE_GEOLOCATION, coords };
}

export function requestCasesByGeolocation(coords) {
    return { type: Actions.REQUEST_CASES_BY_GEOLOCATION, coords}
}

export function selectRegion(selectedRegionId) {
    return { type: Actions.SELECT_REGION, selectedRegionId };
}

export function requestRegions() {
    return { type: Actions.REQUEST_REGIONS }
}

export function requestCasesByRegion(regionId) {
    return { type: Actions.REQUEST_CASES_BY_REGION_ID, regionId }
}

export function receiveCases(json) {
    return {
        type: Actions.RECEIVE_CASES,
        cases: json
    };
}

export function receiveRegions(json) {
    return {
        type: Actions.RECEIVE_REGIONS,
        regions: json
    };
}

export function fetchGeolocation() {
    return dispatch => {
      dispatch(requestGeolocation());
      navigator.geolocation.getCurrentPosition((pos) => {
        dispatch(receiveGeolocation(pos.coords));
        dispatch(fetchCasesByGeolocation(pos.coords));
      });
    }
}

export function fetchRegions() {
    return dispatch => {
        dispatch(requestRegions());
        return fetch("http://localhost:8080/api/regions")
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveRegions(json)));
    }
}

export function fetchCasesByGeolocation(coords) {
    return dispatch => {
        dispatch(requestCasesByGeolocation(coords));
        return fetch(`http://localhost:8080//api/covid19/cases/geo?lat=${coords.latitude}&lon=${coords.longitude}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveCases(json)));
    }
}

export function fetchCasesByRegion(regionId) {
    return dispatch => {
        dispatch(requestCasesByRegion(regionId));
        return fetch(`http://localhost:8080//api/covid19/cases/regions/${regionId}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveCases(json)));
    }
}
