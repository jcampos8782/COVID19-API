import {
  SELECT_REGION,
  SET_FILTER_OPTIONS
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
}

export default (state = initialState, action) => {
  switch(action.type) {
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
      default:
          return state;
  }
}
