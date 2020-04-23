import App from './App';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { styled } from '../../styles';

import {
  fetchGeolocation,
  fetchSeriesList,
  selectTheme,
  fetchDefaultRegion,
  fetchClosestRegion,
  fetchSubregions,
  fetchRegions,
  fetchDefaultSeries,
  setFilterOptions,
  selectRegion,
  selectSeries,
  toggleTheme,
  error
} from '../../actions';

const start = (dispatch, props) => {
  Promise.all([
    dispatch(fetchSeriesList())
      .then(series => dispatch(selectSeries(series[0].id))),
    dispatch(fetchRegions())
      .then(regions => dispatch(setFilterOptions(0, regions.map(r => ({id: r.id, name: r.name})))))
  ])
  .then(
    ok => {
      if(props.isGeolocationAvailable) {
        dispatch(fetchGeolocation())
          .then(
            coords => dispatch(fetchClosestRegion(coords.latitude, coords.longitude)),
            error => dispatch(fetchDefaultRegion(props.defaultRegionName))
          )
          .then(region => {
            let index = region.parents.length;

            // Initialize filters
            if (region.subregions) {
              dispatch(setFilterOptions(index + 1, region.subregions.map(o => ({id: o.id, name: o.name}))))
            }

            // Load subregions for all parents
            Promise.all(region.parents.map(parent => dispatch(fetchSubregions(parent.id))))
              .then(actions => {
                // For each dispatched parent request, set the options for the corresponding filters
                actions.forEach(action => {
                  let filterIndex = region.parents.findIndex(p => p.id === action.regionId);
                  dispatch(setFilterOptions(index - filterIndex, action.subregions.map(o => ({id: o.id, name: o.name}))))
                });
              })
              .then(() => {
                // Select the regions for each filter
                region.parents.forEach((p,idx) => {
                  dispatch(selectRegion(index - idx - 1, p.id))
                });

                // Select the current region
                dispatch(selectRegion(index, region.id));
              })
              .then(() => dispatch(fetchDefaultSeries()))
            })
            .catch(e => {
              dispatch(error(e));
              dispatch(fetchDefaultRegion(props.defaultRegionName));
            });
      } else {
        dispatch(fetchDefaultRegion(props.defaultRegionName))
      }
    },
    error => {
        throw new Error(error.message);
    }
  )
  .catch(e => dispatch(error(e)));
};

const mapStateToProps = (state, own) => ({
    filters: state.filters,
    loading: state.loading,
    location: state.location,
    headlines: state.headlines,
    theme: state.view.theme,
    cookies: own.cookies
});

const mapStateToDispatch = (dispatch,getState) => ({
  error: e => error(e),
  start: props => start(dispatch, props),
  setTheme: theme => dispatch(selectTheme(theme)),
  toggleTheme: cookies => dispatch(toggleTheme(cookies)),
  selectTheme: theme => dispatch(selectTheme(theme))
});

export default styled()(withCookies(connect(mapStateToProps, mapStateToDispatch)(geolocated()(App))));
