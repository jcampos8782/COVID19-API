import {
  REQUEST_SERIES_BY_REGION_ID,
  REQUEST_REGIONS,
  REQUEST_REGION_BY_GEOLOCATION,
  REQUEST_SERIES_LIST,
  REQUEST_GEOLOCATION,
  RECEIVE_SERIES,
  RECEIVE_REGIONS,
  RECEIVE_SERIES_LIST,
  ERROR_GEOLOCATION,
  ERROR_LOADING,
  RECEIVE_GEOLOCATION
} from '../actions/types';

export default (state = false, action) => {
    switch(action.type) {
        case REQUEST_SERIES_BY_REGION_ID:
        case REQUEST_REGION_BY_GEOLOCATION:
        case REQUEST_GEOLOCATION:
        case REQUEST_SERIES_LIST:
        case REQUEST_REGIONS:
          return true;
        case RECEIVE_SERIES:
        case RECEIVE_REGIONS:
        case RECEIVE_SERIES_LIST:
        case RECEIVE_GEOLOCATION:
        case ERROR_GEOLOCATION:
        case ERROR_LOADING:
          return false;
        default:
            return state;
    }
}
