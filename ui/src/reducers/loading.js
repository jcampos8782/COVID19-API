import {
  REQUEST_SERIES_BY_REGION_ID,
  REQUEST_SERIES_BY_GEOLOCATION,
  REQUEST_REGIONS,
  REQUEST_SERIES_LIST,
  REQUEST_GEOLOCATION,
  REQUEST_GEOCODING,
  RECEIVE_SERIES,
  RECEIVE_REGIONS,
  RECEIVE_SERIES_LIST,
  ERROR_GEOLOCATION,
  RECEIVE_GEOLOCATION,
  RECEIVE_GEOCODING
} from '../actions/types';

export default (state = false, action) => {
    switch(action.type) {
        case REQUEST_SERIES_BY_REGION_ID:
        case REQUEST_SERIES_BY_GEOLOCATION:
        case REQUEST_GEOLOCATION:
        case REQUEST_GEOCODING:
        case REQUEST_SERIES_LIST:
        case REQUEST_REGIONS:
          return true;
        case RECEIVE_SERIES:
        case RECEIVE_REGIONS:
        case RECEIVE_SERIES_LIST:
        case RECEIVE_GEOLOCATION:
        case RECEIVE_GEOCODING:
        case ERROR_GEOLOCATION:
          return false;
        default:
            return state;
    }
}
