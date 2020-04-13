import {
  SELECT_REGION,
  SET_FILTER_OPTIONS,
  SELECT_SERIES,
  RECEIVE_REGION,
  UNSELECT_SERIES }
  from './types';

import {fetchRegion} from './RegionActions';
import {fetchSeriesByRegion} from './SeriesActions';

export const selectRegion = (index, id) => ({type: SELECT_REGION, id, index })

export const loadRegion = (index, id) => {
  return (dispatch, getState) => {
    let { filters } = getState();
    dispatch(selectRegion(index, id))

    if (id !== "-1") {
      let promises = [dispatch(fetchRegion(id))];

      if (filters.selectedSeriesId !== "-1") {
        promises.push(dispatch(fetchSeriesByRegion(filters.selectedSeriesId, id)));
      }

      Promise.all(promises).then(results => {
        if (index < filters.regionFilters.length) {
          let regionAction = results.find(r => r.type === RECEIVE_REGION);

          // Reset all filters upon load
          for(let i = index + 1; i < filters.regionFilters.length; i++) {
            dispatch(selectRegion(i, -1));
          }

          // Set subregion options
          dispatch(setFilterOptions(index + 1, regionAction.region.subregions));
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

export const selectSeries = (id) => ({ type: SELECT_SERIES, id })
export const unselectSeries = () => ({type: UNSELECT_SERIES })
