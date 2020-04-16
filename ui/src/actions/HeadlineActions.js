import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestHeadlines = region => ({ type: Actions.REQUEST_HEADLINES, region })
export const receiveHeadlines = headlines => ({ type: Actions.RECEIVE_HEADLINES, headlines })
export const headlinesError = error => ({type: Actions.ERROR_HEADLINES, error})

export function fetchHeadlines() {
  return dispatch => {
    dispatch(requestHeadlines("us"));
    return fetch(`${SERVER_URL}/api/headlines`)
      .then(response => response.json(), error => dispatch(headlinesError(error)))
      .then(json => dispatch(receiveHeadlines(json)))
      .catch(error => dispatch(headlinesError(error)));
  }
}
