import App from './App';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { fetchGeolocation } from '../../actions';

const mapStateToProps = state => ({ ...state });

const mapStateToDispatch = dispatch => ({
  fetchGeolocation: () => dispatch(fetchGeolocation())
});

export default connect(mapStateToProps, mapStateToDispatch)(geolocated()(App));
