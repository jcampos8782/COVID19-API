import * as Actions from './types';
import { selectSeries } from './FilterActions';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestSeriesList = () => ({ type: Actions.REQUEST_SERIES_LIST })
export const requestSeriesByRegion = (seriesId, regionId) => ({ type: Actions.REQUEST_SERIES_BY_REGION_ID, seriesId, regionId })

export const receiveSeries = (series) => ({ type: Actions.RECEIVE_SERIES, series })
export const receiveSeriesList = (series) => ({ type: Actions.RECEIVE_SERIES_LIST, series })

const error = e => ({type: Actions.ERROR_LOADING, error: e })

export function fetchSeriesList() {
  return dispatch => {
    dispatch(requestSeriesList());
    return fetch(`${SERVER_URL}/api/series`)
      .then(response => response.json(), e => { throw new Error("Failed to retrieve series list")})
      .then(json => dispatch(receiveSeriesList(json)))
      .then(action => dispatch(selectSeries(action.series[0].id)))
      .catch(e => dispatch(error(e.message)));
  }
}

export function fetchDefaultSeries() {
  return (dispatch,getState) => {
    let { filters, regions } = getState();
    if (regions.current && filters.selectedSeriesId !== -1) {
      dispatch(fetchSeriesByRegion(filters.selectedSeriesId, regions.current.id));
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
