import { SELECT_REGION, SET_REGIONS } from '../actions/types';

const initialState = {
    regions: [],
    selectedRegionId: -1
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SELECT_REGION:
            return {
                ...state,
                selectedRegionId: action.selectedRegionId
            };
        case SET_REGIONS:
            return {
                ...state,
                regions: action.regions
            };
        default:
            return state;
    }
}