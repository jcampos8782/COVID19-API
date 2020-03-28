import { RECEIVE_SERIES } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case RECEIVE_SERIES:
            return action.series;
        default:
            return state;
    }
}
