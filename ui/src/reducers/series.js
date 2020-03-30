import {
  RECEIVE_SERIES_LIST,
  SELECT_SERIES
} from '../actions/types';

const initialState = {
  all: [],
  current: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_SERIES_LIST:
          return {
              ...state,
              all: action.series
            };
        case SELECT_SERIES:
          return {
            ...state,
            current: state.all.find(s => s.id === action.id)
          };
        default:
            return state;
    }
}
