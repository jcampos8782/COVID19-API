import { createSelector } from 'reselect';
import { selectors as reducers } from '../reducers';

export const getSeries = createSelector(reducers.selectSeries, series => series);
const createSeriesSelector = name => createSelector(getSeries, series => series.find(s => s.name === name))

// TODO: Move these?
export const getCovid19Series = createSeriesSelector("COVID-19");
export const getRtSeries = createSeriesSelector("RT");

export const getCovid19Columns = createSelector(getCovid19Series, s => s ? s.columns : null);
export const getRtColumns = createSelector(getRtSeries, s => s ? s.columns : null);
