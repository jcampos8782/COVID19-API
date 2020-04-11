import { SELECT_THEME } from '../actions/types';

const initialState = 'light'

export default (state = initialState, action) => {
    switch(action.type) {
        case SELECT_THEME:
          return action.theme;
        default:
            return state;
    }
}
