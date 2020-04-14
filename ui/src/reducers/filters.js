import {
  SELECT_REGION,
  SELECT_SERIES,
  UNSELECT_SERIES,
  SET_FILTER_OPTIONS,
  SELECT_DASHBOARD_TAB
} from '../actions/types';

const initialState = {
  regionFilters: [
    {
      label: 'Country',
      selectedId: -1,
      options: []
    },
    {
      label: 'State/Province',
      selectedId: -1,
      options: [],
    },
    {
      label: "County",
      selectedId: -1,
      options: []
    }
  ],
  selectedSeriesId: -1,
  selectedTabId: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
      case SELECT_DASHBOARD_TAB:
        return {
          ...state,
          selectedTabId: action.id
        };
      case SET_FILTER_OPTIONS:
        return {
          ...state,
          regionFilters: state.regionFilters.map((filter, idx) =>
            Object.assign(filter, {options: idx === action.index ? action.options : filter.options}))
        };
      case SELECT_REGION:
        return {
          ...state,
          selectedTabId: 0,
          regionFilters: state.regionFilters.map((filter, idx) =>
            Object.assign(filter, {selectedId: idx === action.index ? action.id : filter.selectedId}))
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
