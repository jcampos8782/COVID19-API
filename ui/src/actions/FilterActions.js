import {
  SELECT_REGION,
  SET_FILTER_OPTIONS
} from './types';

import {fetchRegion} from './RegionActions';
import {fetchSeriesByRegion} from './SeriesActions';

export const selectRegion = (index, id) => ({type: SELECT_REGION, id, index })

export const loadRegion = (index, id) => {
  return (dispatch, getState) => {
    let { filters } = getState();
    dispatch(selectRegion(index, id))

    if (id !== "-1") {
      Promise.all([dispatch(fetchRegion(id)), dispatch(fetchSeriesByRegion(id))])
        .then(results => {
          let region = results[0];
          if (index < filters.regionFilters.length) {
            // Reset all filters upon load
            for(let i = index + 1; i < filters.regionFilters.length; i++) {
              dispatch(selectRegion(i, -1));
              dispatch(setFilterOptions(i, []));
            }

            // Set subregion options
            dispatch(setFilterOptions(index + 1, region.subregions));
          }
        });
      } else {
        // An unselect has occurred
        // Unselect all sub filters
        for(let i = index + 1; i < filters.regionFilters.length; i++) {
          dispatch(selectRegion(i, -1));
          dispatch(setFilterOptions(i, []));
        }

      /// Load parent data if we are higher than the 0th index
      if (index > 0) {
        dispatch(fetchRegion(filters.regionFilters[index - 1].selectedId))
        dispatch(fetchSeriesByRegion(filters.selectedSeriesId, filters.regionFilters[index - 1].selectedId))
      }
    }
  }
}

export const setFilterOptions = (index, options) => ( {type: SET_FILTER_OPTIONS, index, options })
