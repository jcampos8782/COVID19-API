import {
  SELECT_SERIES
} from '../actions/types';

export default (state = null, action) => {
    switch(action.type) {
        case SELECT_SERIES:
          return action.series;
        default:
            return state;
    }
}
