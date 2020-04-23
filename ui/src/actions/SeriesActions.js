import * as Actions from './types';
import { error } from './ErrorActions'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const selectSeries = series => ({ type: Actions.SELECT_SERIES, series })

export const requestSeriesList = () => ({ type: Actions.REQUEST_SERIES_LIST })
export const requestSeriesByRegion = (seriesId, regionId) => ({ type: Actions.REQUEST_SERIES_BY_REGION_ID, seriesId, regionId })

export const receiveSeries = series => ({ type: Actions.RECEIVE_SERIES, series })
export const receiveSeriesList = series => ({ type: Actions.RECEIVE_SERIES_LIST, series })

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

export function fetchSeriesByRegion(regionId) {
    return (dispatch, getState) => {
      let { series } = getState();

      if (!series) {
        throw new Error("Called fetchSeriesByRegion but series is null")
      }

      dispatch(requestSeriesByRegion(series.id, regionId));

      return fetch(`${SERVER_URL}/api/series/${series.id}/regions/${regionId}`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve series")})
        .then(json => {
          dispatch(receiveSeries(json));
          return json;
        })
        .catch(e => dispatch(error(e.message)));;
    }
}
