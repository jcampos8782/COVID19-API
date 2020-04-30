import {createSelector} from 'reselect';
import {selectors as reducers} from '../reducers';

export const getErrors = createSelector(reducers.selectErrors, errors => errors);
