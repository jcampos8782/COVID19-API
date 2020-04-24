import {SELECT_THEME, SELECT_TAB, CHANGE_FILTER_SELECTION} from './types';

export const selectTab = id => ({ type: SELECT_TAB, id })
export const selectTheme = theme => ({type: SELECT_THEME, theme})
export const changeFilterSelection = (index, id) => ({type: CHANGE_FILTER_SELECTION, id, index})

export const toggleTheme = (cookies) => {
  return (dispatch,getState) => {
    const { view } = getState();
    let newTheme = view.theme === 'light' ? 'dark' : 'light';
    cookies.set('theme', newTheme, {'path': '/'});
    return dispatch(selectTheme(newTheme));
  }
}
