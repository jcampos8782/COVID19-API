import { SELECT_REGION, RECEIVE_REGIONS } from '../actions/types';

export default (state = { options: [], selectedRegionId: -1 }, action) => {
  switch(action.type) {
      case SELECT_REGION:
          return {
            ...state,
            selectedRegionId: action.selectedRegionId
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
