import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestHeadlines = region => ({ type: Actions.REQUEST_HEADLINES, region })
export const receiveHeadlines = headlines => ({ type: Actions.RECEIVE_HEADLINES, headlines })
export const headlinesError = error => ({type: Actions.ERROR_HEADLINES, error})

export const changeHeadlinesPage = page => ({type: Actions.CHANGE_HEADLINES_PAGE, page })
export const changeHeadlinesRowsPerPage = rows => ({type: Actions.CHANGE_HEADLINES_ROWS_PER_PAGE, rows})

export function fetchHeadlines(query) {
  return dispatch => {
    dispatch(requestHeadlines(query));
    let queryString = query ? `q=${query}` : '';
    return fetch(`${SERVER_URL}/api/headlines?${queryString}`)
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
