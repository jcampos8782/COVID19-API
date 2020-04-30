import { createSelector } from 'reselect';
import { selectors as reducers } from '../reducers';

export const getRegion = createSelector(reducers.selectRegion, region => region);

export const getContacts = createSelector(getRegion, region => region ? region.contacts : null);
export const getDemographics = createSelector(getRegion, region => region ? region.demographics: null);
export const getFacts = createSelector(getRegion, region => region ? region.facts : null);
export const getHospitalizations = createSelector(getFacts, facts => facts ? (facts.hospitalizations ? facts.hospitalizations : {}) : null);

export const getRegionHeirarchy = createSelector(getRegion, region => region ? [region.parents.slice(0).reverse(), region].flat() : null);
