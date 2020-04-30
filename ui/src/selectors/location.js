import { createSelector } from 'reselect';
import { selectors as reducers } from '../reducers';

export const getLocation = createSelector(reducers.selectLocation, location => location);
