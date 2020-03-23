import * as Actions from './types';

export function setGeoCoord(lat, lon) {
    return { type: Actions.SET_GEO_COORD, lat, lon };
}

export function selectRegion(selectedRegionId) {
    return { type: Actions.SELECT_REGION, selectedRegionId };
}

export function requestRegions() {
    return { type: Actions.REQUEST_REGIONS }
}

export function requestCasesByGeoCoord(lat, lon) {
    return { type: Actions.REQUEST_CASES_BY_GEO_COORD, geo: { lat, lon }}
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

export function fetchRegions() {
    return dispatch => {
        dispatch(requestRegions());
        return fetch("http://localhost:8080/api/regions")
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveRegions(json)));
    }
}

export function fetchCasesByGeoCoord(lat, lon) {
    return dispatch => {
        dispatch(requestCasesByGeoCoord(lat,lon))
        return fetch(`http://localhost:8080//api/covid19/cases/geo?lat=${lat}&lon=${lon}`)
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
