import { RECEIVE_REGIONS } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case RECEIVE_REGIONS:
            return action.regions;
        default:
            return state;
    }
}
