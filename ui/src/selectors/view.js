import {createSelector} from 'reselect';
import { selectors as reducers } from '../reducers';

export const getView = createSelector(reducers.selectView, view => view);
export const getCurrentTab = createSelector(getView, view => view.currentTab);
export const getRegionFilters = createSelector(getView, view => view.filters);
export const getRecentFilterSettings = createSelector(getView, view => view.recent);
export const getTheme = createSelector(getView, view => view.theme);
export const getTrendsFilterSettings = createSelector(getView, view => view.trends);
