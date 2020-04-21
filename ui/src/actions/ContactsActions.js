import * as Actions from './types';
import { error } from './ErrorActions'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestContacts = regionId => ({type: Actions.REQUEST_CONTACTS, regionId})
export const receiveContacts = contacts => ({type: Actions.RECEIVE_CONTACTS, contacts})

export const fetchContacts = regionId => {
  return dispatch => {
    dispatch(requestContacts(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}/contacts`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve facts")})
        .then(json => dispatch(receiveContacts(json)))
        .catch(e => dispatch(error(e.message)));;
  }
}
