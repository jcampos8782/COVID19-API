import { createSelector } from 'reselect';
import { selectors as reducers } from '../reducers';

export const getHeadlines = createSelector(reducers.selectHeadlines, headlines => headlines);
