import {
  RECEIVE_SERIES_DATA,
  REQUEST_SERIES_BY_REGION_ID
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_SERIES_DATA:
            return action.data
        case REQUEST_SERIES_BY_REGION_ID:
            return {};
        default:
            return state;
    }
}
