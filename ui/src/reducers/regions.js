import {
  RECEIVE_REGION,
  RECEIVE_REGIONS
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
        default:
            return state;
    }
}
