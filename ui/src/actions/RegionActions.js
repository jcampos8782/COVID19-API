import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const selectRegion = (id) => ({ type: Actions.SELECT_REGION, id })
export const unselectRegion = () => ({ type: Actions.UNSELECT_REGION })

export const requestRegion = (id) => ({ type: Actions.REQUEST_REGION, id })
export const receiveRegion = (region) => ({ type: Actions.RECEIVE_REGION, region })

export const requestRegions = () => ({ type: Actions.REQUEST_REGIONS })
export const receiveRegions = (regions) => ({ type: Actions.RECEIVE_REGIONS, regions })

export const unselectSubregion = () => ({ type: Actions.UNSELECT_SUBREGION })
export const selectSubregion = (id) => ({type: Actions.SELECT_SUBREGION, id })

export const fetchRegion = (regionId) => {
  return dispatch => {
    dispatch(requestRegion(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}`)
      .then(response => response.json(), error => console.log('Error!', error))
      .then(json => dispatch(receiveRegion(json)));
  }
}

export const fetchRegions = () => {
    return dispatch => {
        dispatch(requestRegions());
        return fetch(`${SERVER_URL}/api/regions`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveRegions(json)));
    }
}
