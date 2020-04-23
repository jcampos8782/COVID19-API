import { SELECT_THEME, SELECT_TAB } from '../actions/types';

const initialState =
{
  theme: 'light',
  currentTab: 0
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SELECT_THEME:
          return {
            ...state,
            theme: action.theme
          };
        case SELECT_TAB:
          return {
            ...state,
            currentTab: action.id
          };
        default:
            return state;
    }
}
