import {
  RECEIVE_REGION,
  RECEIVE_REGIONS,
  REQUEST_REGION,
  UNSELECT_REGION
} from '../actions/types';

export default (state = {all: [], current: null}, action) => {
    switch(action.type) {
        case RECEIVE_REGIONS:
          return {
            ...state,
            all: action.regions
          };
        case RECEIVE_REGION:
          return {
            ...state,
            current: action.region
          };
        case UNSELECT_REGION:
        case REQUEST_REGION:
          return {
            ...state,
            current: null
          };
        default:
            return state;
    }
}
