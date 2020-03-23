import { RECEIVE_CASES } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case RECEIVE_CASES:
            return action.cases;
        default:
            return state;
    }
}
