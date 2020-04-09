import { TOGGLE_THEME } from '../actions/types';

const initialState = 'light'

export default (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_THEME:
          return state === 'light' ? 'dark': 'light'
        default:
            return state;
    }
}
