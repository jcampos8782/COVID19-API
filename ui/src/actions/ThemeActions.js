import {SELECT_THEME} from './types';
export const selectTheme = theme => ({type: SELECT_THEME, theme})

export const toggleTheme = (cookies) => {
  return (dispatch,getState) => {
    const { theme } = getState();
    let newTheme = theme === 'light' ? 'dark' : 'light';
    cookies.set('theme', newTheme, {'path': '/'});
    return dispatch(selectTheme(newTheme));
  }
}
