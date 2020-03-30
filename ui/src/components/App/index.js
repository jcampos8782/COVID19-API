import App from './App';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { fetchGeolocation, fetchSeriesList, fetchRegions } from '../../actions';

const mapStateToProps = state => ({ ...state });

const mapStateToDispatch = dispatch => ({
  fetchGeolocation: () => dispatch(fetchGeolocation()),
  fetchSeriesList: () => dispatch(fetchSeriesList()),
  fetchRegions: () => dispatch(fetchRegions())
});

export default connect(mapStateToProps, mapStateToDispatch)(geolocated()(App));
