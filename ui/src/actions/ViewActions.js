import {
  SELECT_THEME,
  SELECT_TAB,
  CHANGE_FILTER_SELECTION,
  SET_RECENT_PERIOD,
  SET_TREND_SERIES,
  SET_TREND_PERIOD
} from './types';

export const selectTab = id => ({ type: SELECT_TAB, id })
export const selectTheme = theme => ({type: SELECT_THEME, theme})
export const changeFilterSelection = (index, id) => ({type: CHANGE_FILTER_SELECTION, id, index})
export const setRecentPeriod = period => ({type: SET_RECENT_PERIOD, period});
export const setTrendSeries = series => ({type: SET_TREND_SERIES, series});
export const setTrendPeriod = period => ({type: SET_TREND_PERIOD, period})

export const toggleTheme = (cookies) => {
  return (dispatch,getState) => {
    const { view } = getState();
    let newTheme = view.theme === 'light' ? 'dark' : 'light';
    cookies.set('theme', newTheme, {'path': '/'});
    return dispatch(selectTheme(newTheme));
  }
}
