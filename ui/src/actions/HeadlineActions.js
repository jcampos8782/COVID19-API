import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestHeadlines = region => ({ type: Actions.REQUEST_HEADLINES, region })
export const receiveHeadlines = headlines => ({ type: Actions.RECEIVE_HEADLINES, headlines })
export const headlinesError = error => ({type: Actions.ERROR_HEADLINES, error})

export const changeHeadlinesPage = page => ({type: Actions.CHANGE_HEADLINES_PAGE, page })
export const changeHeadlinesRowsPerPage = rows => ({type: Actions.CHANGE_HEADLINES_ROWS_PER_PAGE, rows})

export function fetchHeadlines() {
  return dispatch => {
    dispatch(requestHeadlines("us"));
    return fetch(`${SERVER_URL}/api/headlines`)
      .then(response => response.json(), e => { throw new Error("Failed to retrieve series")} )
      .then(json => {
        if (json.error) {
          throw new Error(json.error);
        } else {
          dispatch(receiveHeadlines(json.headlines));
        }
      })
      .catch(e => dispatch(headlinesError(e.message)));
  }
}
