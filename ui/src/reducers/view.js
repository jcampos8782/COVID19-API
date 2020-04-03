import {
  REQUEST_SERIES_BY_REGION_ID,
  REQUEST_SERIES_BY_GEOLOCATION,
  REQUEST_REGIONS,
  REQUEST_SERIES_LIST,
  RECEIVE_SERIES,
  RECEIVE_REGIONS,
  RECEIVE_SERIES_LIST
} from '../actions/types';

const initialState = {
  seriesOptionsLoaded: false,
  regionOptionsLoaded: false,
  seriesForRegionLoaded: true // default to true to prevent spinner when geolocation is disabled
};

export default (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_SERIES_BY_REGION_ID:
          return {
              ...state,
              seriesForRegionLoaded: false
            };
        case REQUEST_SERIES_BY_GEOLOCATION:
          return {
            ...state,
            seriesForRegionLoaded: false
          };
        case REQUEST_REGIONS:
          return {
              ...state,
              regionOptionsLoaded: false
            };
        case REQUEST_SERIES_LIST:
          return {
            ...state,
            seriesOptionsLoaded: false
          };
        case RECEIVE_SERIES:
          return {
              ...state,
              seriesForRegionLoaded: true
            };
        case RECEIVE_REGIONS:
          return {
              ...state,
              regionOptionsLoaded: true
            };
        case RECEIVE_SERIES_LIST:
          return {
            ...state,
            seriesOptionsLoaded: true
          };
        default:
            return state;
    }
}
