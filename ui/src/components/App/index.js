import App from './App';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { fetchGeolocation, fetchSeriesList, fetchRegions } from '../../actions';
import {withStyles} from '@material-ui/core/styles';

const mapStateToProps = state => ({ ...state });

const mapStateToDispatch = dispatch => ({
  fetchGeolocation: () => dispatch(fetchGeolocation()),
  fetchSeriesList: () => dispatch(fetchSeriesList()),
  fetchRegions: () => dispatch(fetchRegions())
});

const styles = theme => ({
  body: {
    // The AppBar needs to be position: fixed so offset this by the bar's height
    position: 'relative',
    display: 'inline-block',
    top: 75
  },
  navLink: {
    width: 'fit-content',
    color: theme.palette.primary.contrastText
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(withStyles(styles)(geolocated()(App)));
