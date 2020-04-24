import {
  REQUEST_REGIONS,
  REQUEST_SERIES_LIST,
  REQUEST_GEOLOCATION,
  RECEIVE_REGIONS,
  RECEIVE_SERIES_LIST,
  ERROR_GEOLOCATION,
  ERROR_LOADING,
  RECEIVE_GEOLOCATION,
  REQUEST_REGION,
  RECEIVE_REGION
} from '../actions/types';

export default (state = [], action) => {
    let actions = state.slice(0);
    switch(action.type) {
        case REQUEST_GEOLOCATION:
        case REQUEST_SERIES_LIST:
        case REQUEST_REGIONS:
        case REQUEST_REGION:
          actions.push(action);
          return actions;
        case RECEIVE_REGION:
        case RECEIVE_REGIONS:
        case RECEIVE_SERIES_LIST:
        case RECEIVE_GEOLOCATION:
        case ERROR_GEOLOCATION:
        case ERROR_LOADING:
          actions.pop();
          return actions;
        default:
            return state;
    }
}
