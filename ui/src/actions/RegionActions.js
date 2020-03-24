import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const receiveRegions = (regions) => {
    return {
        type: Actions.RECEIVE_REGIONS,
        regions
    };
}

export const selectRegion = (selectedRegionId) => {
    return { type: Actions.SELECT_REGION, selectedRegionId };
}

export const requestRegions = () => {
    return { type: Actions.REQUEST_REGIONS }
}

export const fetchRegions = (host = "", onComplete) => {
    return dispatch => {
        dispatch(requestRegions());
        return fetch(`${SERVER_URL}/api/regions`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveRegions(json)));
    }
}
