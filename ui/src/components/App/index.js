import App from './App';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { styled } from '../../styles';

import {
  fetchGeolocation,
  fetchSeriesList,
  fetchRegions,
  fetchDefaultSeries,
  toggleTheme
} from '../../actions';

const mapStateToProps = state => ({
  filters: state.filters,
  loading: state.loading,
  location: state.location,
  theme: state.theme
});

const mapStateToDispatch = dispatch => ({
  fetchGeolocation: () => dispatch(fetchGeolocation()),
  fetchSeriesList: () => dispatch(fetchSeriesList()),
  fetchRegions: () => dispatch(fetchRegions()),
  fetchDefaultSeries: () => dispatch(fetchDefaultSeries()),
  toggleTheme: () => dispatch(toggleTheme())
});

export default styled()(connect(mapStateToProps, mapStateToDispatch)(geolocated()(App)));
