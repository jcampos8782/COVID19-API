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
  selectSeries,
  selectRegion,
  receiveRegions,
  error
} from '../../actions';

const defaultProps = {
  isGeolocationAvailable: false,
  defaultRegionName: "United States"
}

export const start = (dispatch, props = defaultProps) => {
  Promise.all([dispatch(fetchRegions(0)), loadAllSeries(dispatch)])
    .then(
      results => loadUserRegion(dispatch, results[0], props),
      e => dispatch(error(e))
    )
    .then(
      region => {
        initializeRegionFilters(dispatch, props, region)
          .then(() => {
            dispatch(fetchSeriesByRegion(region));
            dispatch(selectRegion(region));
          })
      },
      e => dispatch(error(e))
    ).catch(e => {
      dispatch(error(e));
    });
}

// Fetch all series and set the filter to the first in the list
const loadAllSeries = dispatch => (
  dispatch(fetchSeriesList())
    .then(series => dispatch(selectSeries(series[0])))
)

// Loads the user's region. Uses geolocation if possible
const loadUserRegion = (dispatch, allRegions, props) => {
  if(!props.isGeolocationAvailable) {
    return dispatch(fetchDefaultRegion(props.defaultRegionName));
  }

  return dispatch(fetchGeolocation())
    .then(
      coords => dispatch(fetchClosestRegion(coords.latitude, coords.longitude)),
      error => dispatch(fetchDefaultRegion(allRegions, props.defaultRegionName))
    )
}

// Fetches all ancestors and subregions and loads data into filter options
const initializeRegionFilters = (dispatch, props, region) => {
  let index = region.parents.length;

  // Load subregions for all parents
  return Promise.all(region.parents.map(parent => dispatch(fetchSubregions(parent.id))))
    .then(parent => {
      parent.forEach(parent => {
        let filterIndex = region.parents.findIndex(p => p.id === parent.id);
        dispatch(receiveRegions(index - filterIndex, parent.subregions));
      });
    })
}
