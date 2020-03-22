import * as Actions from './types';

export function setGeoCoord(lat, lon) {
    return { type: Actions.SET_GEO_COORD, lat, lon };
}

export function setCases(cases) {
    return { type: Actions.SET_CASES, cases }
}

export function selectRegion(selectedRegionId) {
    return { type: Actions.SELECT_REGION, selectedRegionId };
}

export function setRegions(regions) {
    return { type: Actions.SET_REGIONS, regions };
}