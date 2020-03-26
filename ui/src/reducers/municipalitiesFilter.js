import {
  SELECT_MUNICIPALITY,
  SELECT_REGION,
  UNSELECT_MUNICIPALITY,
  RECEIVE_MUNICIPALITIES
} from '../actions/types';

export default (state = { options: [], selectedMunicipalityId: -1, selectedRegionId: -1 }, action) => {
  switch(action.type) {
      case SELECT_MUNICIPALITY:
          return {
            ...state,
            selectedMunicipalityId: action.selectedMunicipalityId
          };
      case SELECT_REGION:
        return {
          ...state,
          selectedRegionId: action.selectedRegionId
        };
      case UNSELECT_MUNICIPALITY:
        return {
          ...state,
          selectedMunicipalityId: -1
        };
      case RECEIVE_MUNICIPALITIES:
        return {
          ...state,
          options: action.municipalities
        };
      default:
          return state;
  }
}
