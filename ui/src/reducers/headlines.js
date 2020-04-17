import {
  REQUEST_HEADLINES,
  RECEIVE_HEADLINES,
  ERROR_HEADLINES,
  CHANGE_HEADLINES_PAGE,
} from '../actions/types';

const initialState = {
  articles: [],
  error: null,
  loading: false,
  paging: {
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    currentPage: 0
  }
};
export default (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_HEADLINES:
          return {
            articles: action.headlines,
            error: null,
            loading: false,
            paging: {
              ...state.paging,
              currentPage: 0
            }
          };
        case REQUEST_HEADLINES:
          return {
            articles: [],
            error: null,
            loading: true,
            paging: {
              ...state.paging,
              currentPage: 0
            }
          }
        case CHANGE_HEADLINES_PAGE:
          return {
            ...state,
            paging: {
              ...state.paging,
              currentPage: action.page
            }
          };
        case ERROR_HEADLINES:
          return {
            articles: [],
            error: action.error,
            loading: false,
            paging: {
              ...state.paging,
              currentPage: 0
            }
          }
        default:
          return state;
    }
}
