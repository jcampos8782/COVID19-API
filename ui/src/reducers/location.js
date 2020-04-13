import { RECEIVE_GEOLOCATION, ERROR_GEOLOCATION } from '../actions/types';

export default (state = {enabled: true}, action) => {
    switch(action.type) {
        case ERROR_GEOLOCATION:
            return {
              ...state,
              enabled: false
            } ;
        case RECEIVE_GEOLOCATION:
            return {
                ...state,
                coords: {
                    latitude: action.coords.latitude,
                    longitude: action.coords.longitude
                }
            };
        default:
            return state;
    }
}
