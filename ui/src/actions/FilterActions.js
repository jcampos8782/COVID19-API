import {
  SELECT_REGION,
  UNSELECT_REGION,
  SET_FILTER_OPTIONS,
  SELECT_SERIES,
  UNSELECT_SERIES }
  from './types';

export const selectRegion = (index, id) => ({ type: SELECT_REGION, id, index })
export const unselectRegion = (index) => ({ type: UNSELECT_REGION, index })

export const setFilterOptions = (index, options) => ({type: SET_FILTER_OPTIONS, index, options})

export const selectSeries = (id) => ({ type: SELECT_SERIES, id })
export const unselectSeries = () => ({type: UNSELECT_SERIES })
