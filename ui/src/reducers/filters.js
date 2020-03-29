import {
  SELECT_REGION,
  SELECT_SUBREGION,
  RECEIVE_REGIONS
} from '../actions/types';

export default (state = { selectedRegionId: -1, selectedSubregionId: -1 }, action) => {
  switch(action.type) {
      case SELECT_REGION:
        return {
          ...state,
          selectedRegionId: action.id
        };
      case SELECT_SUBREGION:
        return {
          ...state,
          selectedSubregionId: action.id
        };
      case RECEIVE_REGIONS:
        return {
          ...state,
          options: action.regions
        };
      default:
          return state;
  }
}
