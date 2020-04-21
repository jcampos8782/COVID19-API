import * as Actions from './types';
import { error } from './ErrorActions'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestDemographics = regionId => ({type: Actions.REQUEST_DEMOGRAPHICS, regionId})
export const receiveDemographics = demographics => ({type: Actions.RECEIVE_DEMOGRAPHICS, demographics})

export const fetchDemographics = regionId => {
  return dispatch => {
    dispatch(requestDemographics(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}/demographics`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve facts")})
        .then(json => dispatch(receiveDemographics(json)))
        .catch(e => dispatch(error(e.message)));;
  }
}
