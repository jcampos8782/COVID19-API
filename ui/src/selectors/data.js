import { createSelector } from 'reselect';
import  { selectors as reducers } from '../reducers';

export const getData = createSelector(reducers.selectData, data => data);
export const getDataKeys = createSelector(getData, data => data ? Object.keys(data) : null);

const createDataSelector = series => createSelector(getData, data => data ? data[series] : null)

// TODO: Move these?
export const getCovid19Data = createDataSelector("covid19");
export const getRtData = createDataSelector("rt");
