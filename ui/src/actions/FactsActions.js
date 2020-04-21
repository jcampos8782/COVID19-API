import * as Actions from './types';
import { error } from './ErrorActions'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestFacts = regionId => ({type: Actions.REQUEST_FACTS, regionId})
export const receiveFacts = facts => ({type: Actions.RECEIVE_FACTS, facts})

export const fetchFacts = regionId => {
  return dispatch => {
    dispatch(requestFacts(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}/facts`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve facts")})
        .then(json => dispatch(receiveFacts(json)))
        .catch(e => dispatch(error(e.message)));;
  }
}
