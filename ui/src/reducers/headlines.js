import {
  REQUEST_HEADLINES,
  RECEIVE_HEADLINES,
  ERROR_HEADLINES
} from '../actions/types';

const initialState = { articles: [], error: null, loading: false };
export default (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_HEADLINES:
          // limit 5 for now
          let headlines = action.headlines.slice(0);
          if (headlines.length > 5) {
            headlines = headlines.slice(0, 5);
          }
          return {
            articles: headlines,
            error: null,
            loading: false
          };
        case REQUEST_HEADLINES:
          return {
            articles: [],
            error: null,
            loading: true
          }
        case ERROR_HEADLINES:
          return {
            articles: [],
            error: action.error,
            loading: false
          }
        default:
          return state;
    }
}
