import {createSelector} from 'reselect';

export const getView = state => state.view;
export const getRecentFilterSettings = createSelector([getView], view => view.recent);
export const getTrendsFilterSettings = createSelector([getView], view => view.trends);
