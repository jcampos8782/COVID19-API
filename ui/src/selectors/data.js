import { createSelector } from 'reselect';
import  { selectors as reducers } from '../reducers';

export const getData = createSelector(reducers.selectData, data => data);
export const getDataKeys = createSelector(getData, data => data ? Object.keys(data) : null);
