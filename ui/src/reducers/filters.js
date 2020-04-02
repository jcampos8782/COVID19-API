import {
  SELECT_REGION,
  UNSELECT_REGION,
  SELECT_SUBREGION,
  UNSELECT_SUBREGION,
  SELECT_SERIES,
  UNSELECT_SERIES,
  SELECT_DASHBOARD_TAB
} from '../actions/types';

const initialState = {
  selectedSeriesId: -1,
  selectedRegionId: -1,
  selectedSubregionId: -1,
  selectedTabId: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
      case SELECT_DASHBOARD_TAB:
        return {
          ...state,
          selectedTabId: action.id
        };
      case SELECT_REGION:
        return {
          ...state,
          selectedRegionId: action.id
        };
      case UNSELECT_REGION:
        return {
          ...state,
          selectedRegionId: -1,
          selectedSubregionId: -1
        };
      case SELECT_SUBREGION:
        return {
          ...state,
          selectedSubregionId: action.id
        };
      case UNSELECT_SUBREGION:
        return {
          ...state,
          selectedSubregionId: -1
        };
      case SELECT_SERIES:
        return {
          ...state,
          selectedSeriesId: action.id
        };
      case UNSELECT_SERIES:
        return {
          ...state,
          selectedSeriesId: -1
        }
      default:
          return state;
  }
}
