import { createSelector } from 'reselect';
import { selectors as reducers } from '../reducers';

export const getSeries = createSelector(reducers.selectSeries, series => series);
export const getSeriesDataColumns = createSelector(getSeries, series => series ? series.columns : null);
