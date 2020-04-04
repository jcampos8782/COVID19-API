import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const selectSeries = (id) => ({ type: Actions.SELECT_SERIES, id })
export const unselectSeries = () => ({type: Actions.UNSELECT_SERIES })

export const requestSeriesList = () => ({ type: Actions.REQUEST_SERIES_LIST })
export const requestSeriesByRegion = (seriesId, regionId) => ({ type: Actions.REQUEST_SERIES_BY_REGION_ID, seriesId, regionId })
export const requestSeriesByGeolocation = (seriesId, coords) => ({ type: Actions.REQUEST_SERIES_BY_GEOLOCATION, seriesId, coords })

export const receiveSeries = (series) => ({ type: Actions.RECEIVE_SERIES, series })
export const receiveSeriesList = (series) => ({ type: Actions.RECEIVE_SERIES_LIST, series })

export function fetchSeriesList() {
  return dispatch => {
    dispatch(requestSeriesList());
    return fetch(`${SERVER_URL}/api/series`)
      .then(response => response.json(), error => console.log('Error!', error))
      .then(json => dispatch(receiveSeriesList(json)))
      .then(action => dispatch(selectSeries(action.series[0].id)));
  }
}

export function fetchDefaultSeries() {
  return (dispatch,getState) => {
    let { filters } = getState();

    if (filters.selectedRegionId !== -1 && filters.selectedSeriesId !== -1) {
      dispatch(fetchSeriesByRegion(filters.selectedSeriesId, filters.selectedRegionId));
    }
  }
}

export function fetchSeriesByGeolocation(seriesId, coords) {
    return dispatch => {
        dispatch(requestSeriesByGeolocation(seriesId, coords));
        return fetch(`${SERVER_URL}/api/series/${seriesId}/geo?lat=${coords.latitude}&lon=${coords.longitude}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveSeries(json)));
    }
}

export function fetchSeriesByRegion(seriesId, regionId) {
    return dispatch => {
        dispatch(requestSeriesByRegion(seriesId, regionId));
        return fetch(`${SERVER_URL}/api/series/${seriesId}/regions/${regionId}`)
            .then(response => response.json(), error => console.log('Error!', error))
            .then(json => dispatch(receiveSeries(json)));
    }
}
