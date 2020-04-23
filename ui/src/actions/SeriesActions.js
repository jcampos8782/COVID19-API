import * as Actions from './types';
import { error } from './ErrorActions'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestSeriesList = () => ({ type: Actions.REQUEST_SERIES_LIST })
export const requestSeriesByRegion = (seriesId, regionId) => ({ type: Actions.REQUEST_SERIES_BY_REGION_ID, seriesId, regionId })

export const receiveSeries = (series) => ({ type: Actions.RECEIVE_SERIES, series })
export const receiveSeriesList = (series) => ({ type: Actions.RECEIVE_SERIES_LIST, series })

export function fetchSeriesList() {
  return dispatch => {
    dispatch(requestSeriesList());
    return fetch(`${SERVER_URL}/api/series`)
      .then(response => response.json(), e => { throw new Error("Failed to retrieve series list")})
      .then(json => {
        dispatch(receiveSeriesList(json))
        return json;
      })
      .catch(e => dispatch(error(e.message)));
  }
}

export function fetchDefaultSeries() {
  return (dispatch,getState) => {
    let { filters, region } = getState();
    if (region && filters.selectedSeriesId !== -1) {
      dispatch(fetchSeriesByRegion(filters.selectedSeriesId, region.id));
    }
  }
}

export function fetchSeriesByRegion(seriesId, regionId) {
    return dispatch => {
        dispatch(requestSeriesByRegion(seriesId, regionId));
        return fetch(`${SERVER_URL}/api/series/${seriesId}/regions/${regionId}`)
            .then(response => response.json(), e => { throw new Error("Failed to retrieve series")})
            .then(json => dispatch(receiveSeries(json)))
            .catch(e => dispatch(error(e.message)));;
    }
}
