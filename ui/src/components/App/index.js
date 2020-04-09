import App from './App';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import {withStyles} from '@material-ui/core/styles';

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

const styles = theme => ({
  body: {
    // The AppBar needs to be position: fixed so offset this by the bar's height
    position: 'relative',
    display: 'inline-block',
    top: 75
  },
  appbar: {
    backgroundColor: theme.palette.background.dark
  },
  navLink: {
    width: 'fit-content',
    color: theme.palette.primary.contrastText
  },
  navButton: {
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      background: theme.palette.secondary.light
    }
  }
});

export default withStyles(styles)(connect(mapStateToProps, mapStateToDispatch)(geolocated()(App)));
