import * as Actions from './types';
import { error } from './ErrorActions'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestSeriesList = () => ({ type: Actions.REQUEST_SERIES_LIST })
export const requestSeriesByRegion = (series, region) => ({ type: Actions.REQUEST_SERIES_BY_REGION_ID, series, region })

export const receiveSeriesData = (region, series) => ({ type: Actions.RECEIVE_SERIES_DATA, region, series })
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
      .catch(e => dispatch(error(e)));
  }
}

export function fetchSeriesByRegion(series, region) {
    return dispatch => {
      if (!series || !series.id) {
        throw new Error("Called fetchSeriesByRegion but series is null");
      }

      if (!region || !region.id) {
        throw new Error("Failed to request series for region");
      }

      dispatch(requestSeriesByRegion(series, region));

      return fetch(`${SERVER_URL}/api/series/${series.id}/regions/${region.id}`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve series")})
        .then(series => {
          dispatch(receiveSeriesData(region, series));
          return { region, series };
        })
        .catch(e => {
          dispatch(error(e))
        });
    }
}
