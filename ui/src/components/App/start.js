/*
  Performs initialization of the web application.
    - Loads all top-level regions
    - Loads series
    - Fetches user's geolocation
      - Fetches region if available
      - Sets default if not
    - Initializes filters
    - Loads data
*/
import {
  fetchGeolocation,
  fetchSeriesList,
  fetchDefaultRegion,
  fetchClosestRegion,
  fetchSubregions,
  fetchRegions,
  fetchSeriesByRegion,
  setFilterOptions,
  selectRegion,
  selectSeries,
  error
} from '../../actions';

const defaultProps = {
  isGeolocationAvailable: false,
  defaultRegionName: "United States"
}

export const start = (dispatch, props = defaultProps) => {
  Promise.all([loadTopLevelRegions(dispatch), loadAllSeries(dispatch)])
    .then(
      ok => loadUserRegion(dispatch, props),
      error => dispatch(error(error))
    )
    .then(
      region => {
        dispatch(fetchSeriesByRegion(region.id));
        initializeRegionFilters(dispatch, props, region);
      },
      error => dispatch(error(error))
    ).catch(e => {
      dispatch(error(e));
    });
}

// Load all regions and set the options in the root filter
const loadTopLevelRegions = dispatch => (
  dispatch(fetchRegions())
    .then(regions => dispatch(setFilterOptions(0, regions.map(r => ({id: r.id, name: r.name})))))
)

// Fetch all series and set the filter to the first in the list
const loadAllSeries = dispatch => (
  dispatch(fetchSeriesList())
    .then(series => dispatch(selectSeries(series[0])))
)

// Loads the user's region. Uses geolocation if possible
const loadUserRegion = (dispatch, props) => {
  if(!props.isGeolocationAvailable) {
    return dispatch(fetchDefaultRegion(props.defaultRegionName));
  }

  return dispatch(fetchGeolocation())
    .then(
      coords => dispatch(fetchClosestRegion(coords.latitude, coords.longitude)),
      error => dispatch(fetchDefaultRegion(props.defaultRegionName))
    )
}

// Fetches all ancestors and subregions and loads data into filter options
const initializeRegionFilters = (dispatch, props, region) => {
  let index = region.parents.length;
  if (region.subregions) {
    dispatch(setFilterOptions(index + 1, region.subregions.map(o => ({id: o.id, name: o.name}))));
  }

  // Load subregions for all parents
  Promise.all(region.parents.map(parent => dispatch(fetchSubregions(parent.id))))
    .then(parent => {
      console.log(parent);
      // For each dispatched parent request, set the options for the corresponding filters
      parent.forEach(parent => {
        let filterIndex = region.parents.findIndex(p => p.id === parent.id);
        dispatch(setFilterOptions(index - filterIndex, parent.subregions.map(o => ({id: o.id, name: o.name}))))
      });
    })
    .then(() => {
      // Select the regions for each filter
      region.parents.forEach((p,idx) => {
        dispatch(selectRegion(index - idx - 1, p.id))
      });

      // Select the current region
      dispatch(selectRegion(index, region.id));
    });
}
