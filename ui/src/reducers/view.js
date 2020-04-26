import {
  SELECT_THEME,
  SELECT_TAB,
  CHANGE_FILTER_SELECTION,
  RECEIVE_REGIONS,
  SELECT_REGION,
  SET_RECENT_PERIOD
} from '../actions/types';

const initialState =
{
  theme: 'light',
  currentTab: 0,
  recentPeriod: 7,
  recentOption: [7, 14, 30],
  filters: [
    {
      label: 'Country',
      value: -1,
      options: [],
      none: -1
    },
    {
      label: 'State/Province',
      value: -1,
      options: [],
      none: -1,
      icon: "fas fa-minus-circle"
    },
    {
      label: "County",
      value: -1,
      options: [],
      none: -1,
      icon: "fas fa-minus-circle"
    }
  ]
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SELECT_THEME:
          return {
            ...state,
            theme: action.theme
          };
        case SELECT_TAB:
          return {
            ...state,
            currentTab: action.id
          };
        case SET_RECENT_PERIOD:
          return {
            ...state,
            recentPeriod: action.period
          };
        case CHANGE_FILTER_SELECTION:
          return {
            ...state,
            currentTab: initialState.currentTab,
            filters: state.filters.map((filter, idx) =>
              Object.assign(filter, {value: idx === action.index ? action.id : filter.value}))
          };
        case RECEIVE_REGIONS:
          let {level, regions} = action;

          return {
            ...state,
            filters: state.filters.map((filter, idx) =>
              Object.assign(filter, {
                options: idx === level
                  ? regions.map(r => ({value: r.id, text: r.name}))
                  : filter.options
            })
          )};
        case SELECT_REGION:
          // Two things:
          //  - set the filter if its not already set
          //  - set the subregions
          let {region} = action;
          let regionIndex = region.parents.length;

          // Set filter options based on IDs of the region heirarchy
          // If the index is less than the length of the filters, unselect all
          // subfilters
          return {
            ...state,
            currentTab: initialState.currentTab,
            filters: state.filters.map((filter, idx) =>
              Object.assign(filter, {
                value: idx === region.parents.length
                  ? region.id
                  : idx < regionIndex ? region.parents[regionIndex - idx - 1].id : -1,
                none: idx === 0 || idx > regionIndex ? -1 : region.parents[region.parents.length - idx].id,
                options: idx <= regionIndex
                  ? filter.options
                  : idx === regionIndex + 1
                    ? region.subregions.map(r => ({value: r.id, text: r.name}))
                    : [] // clear any options beyond 1 level
              })
            )
          }
        default:
            return state;
    }
}
