import { RECEIVE_MUNICIPALITIES } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case RECEIVE_MUNICIPALITIES:
            return action.municipalities;
        default:
            return state;
    }
}
