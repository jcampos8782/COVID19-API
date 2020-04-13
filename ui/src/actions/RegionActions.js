import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestRegion = id => ({ type: Actions.REQUEST_REGION, id })
export const receiveRegion = region => ({ type: Actions.RECEIVE_REGION, region })

export const requestRegions = () => ({ type: Actions.REQUEST_REGIONS })
export const receiveRegions = regions => ({ type: Actions.RECEIVE_REGIONS, regions })

export const requestSubregions = () => ({ type: Actions.REQUEST_SUBREGIONS })
export const receiveSubregions = (regionId, subregions) => ({ type: Actions.RECEIVE_SUBREGIONS, regionId, subregions })

export const requestRegionByGeoCoords = (lat,lon) =>  ({ type: Actions.REQUEST_REGION_BY_GEOLOCATION, lat, lon })
export const receiveRegionByGeoCoords = region =>  ({ type: Actions.RECEIVE_REGION, region })

const error = e => ({type: Actions.ERROR_LOADING, error: e })

export const fetchClosestRegion = (lat,lon) => {
  return (dispatch,getState) => {
    dispatch(requestRegionByGeoCoords(lat,lon));
    return fetch(`${SERVER_URL}/api/regions/geo?lat=${lat}&lon=${lon}`)
      .then(response => response.json(), e => dispatch(error(e)))
      .then(json => dispatch(receiveRegion(json)));
  }
}

export const fetchSubregions = regionId => {
    return dispatch => {
      dispatch(requestSubregions(regionId));
      return fetch(`${SERVER_URL}/api/regions/${regionId}/subregions`)
        .then(response => response.json(), e => dispatch(error(e)))
        .then(json => dispatch(receiveSubregions(regionId, json)));
    }
}

export const fetchRegion = (regionId) => {
  return (dispatch,getState) => {
    dispatch(requestRegion(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}`)
      .then(response => response.json(), e => dispatch(error(e)))
      .then(json => dispatch(receiveRegion(json)));
  }
}

export const fetchRegions = () => {
    return dispatch => {
        dispatch(requestRegions());
        return fetch(`${SERVER_URL}/api/regions`)
            .then(response => response.json(), e => dispatch(error(e)))
            .then(json => dispatch(receiveRegions(json)));
    }
}
