import { RECEIVE_GEOLOCATION } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_GEOLOCATION:
            return action.coords;
        default:
            return state;
    }
}
