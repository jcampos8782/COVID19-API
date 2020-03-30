import {
  RECEIVE_SERIES_LIST
} from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case RECEIVE_SERIES_LIST:
            return action.series;
        default:
            return state;
    }
}
