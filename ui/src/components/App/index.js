import App from './App';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { styled } from '../../styles';

import {
  fetchGeolocation,
  fetchSeriesList,
  selectTheme,
  fetchRegions,
  fetchDefaultSeries,
  setFilterOptions,
  toggleTheme,
  error
} from '../../actions';

const mapStateToProps = (state, own) => ({
    filters: state.filters,
    loading: state.loading,
    location: state.location,
    headlines: state.headlines,
    theme: state.theme,
    cookies: own.cookies
});

const mapStateToDispatch = dispatch => ({
  error: e => error(e),
  fetchGeolocation: () => dispatch(fetchGeolocation()),
  fetchSeriesList: () => dispatch(fetchSeriesList()),
  fetchRegions: () => dispatch(fetchRegions()),
  fetchDefaultSeries: () => dispatch(fetchDefaultSeries()),
  toggleTheme: cookies => dispatch(toggleTheme(cookies)),
  selectTheme: theme => dispatch(selectTheme(theme)),
  setRegions: regions => dispatch(setFilterOptions(0, regions.map(r => ({id: r.id, name: r.name}))))
});

export default styled()(withCookies(connect(mapStateToProps, mapStateToDispatch)(geolocated()(App))));
