import { createSelector } from 'reselect';
import  { selectors as reducers } from '../reducers';

export const getData = createSelector(reducers.selectData, data => data);

const createDataSelector = series => createSelector(getData, data => data ? data[series]: null)

// TODO: Move these?
export const getCovid19Data = createDataSelector("covid19");
export const getRtData = createDataSelector("rt");
