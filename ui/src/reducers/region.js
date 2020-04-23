import {
  SELECT_REGION,
  REQUEST_REGION
} from '../actions/types';

const defaultState = null

export default (state = defaultState, action) => {
    switch(action.type) {
        case SELECT_REGION:
          return action.region
        case REQUEST_REGION:
          return null;
        default:
            return state;
    }
}
