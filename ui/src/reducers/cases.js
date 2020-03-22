import { SET_CASES } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case SET_CASES:
            return [...action.cases];
        default:
            return state;
    }
}