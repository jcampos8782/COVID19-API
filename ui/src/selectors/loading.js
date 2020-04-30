import { createSelector } from 'reselect';
import { selectors as reducers } from '../reducers';

export const getLoading = createSelector(reducers.selectLoading, loading => loading);
export const getIsLoading = createSelector(getLoading, loading => loading.length > 0)
