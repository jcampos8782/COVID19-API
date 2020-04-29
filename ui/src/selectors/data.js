import {createSelector} from 'reselect';
export const getData = state => state.data;
export const getKeys = createSelector([getData], data => Object.keys(data));
