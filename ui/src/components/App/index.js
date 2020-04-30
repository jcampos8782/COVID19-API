import App from './App';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { styled } from '../../styles';
import { start } from './start';

import {
  getRegionFilters,
  getTheme,
  getIsLoading,
  getLocation,
  getHeadlines
} from '../../selectors';

import {
  selectTheme,
  toggleTheme,
  error
} from '../../actions';

const mapStateToProps = (state, own) => ({
    filters: getRegionFilters(state),
    loading: getIsLoading(state),
    location: getLocation(state),
    headlines: getHeadlines(state),
    theme: getTheme(state),
    cookies: own.cookies
});

const mapStateToDispatch = (dispatch, getState) => ({
  error: e => error(e),
  start: props => start(dispatch, props),
  setTheme: theme => dispatch(selectTheme(theme)),
  toggleTheme: cookies => dispatch(toggleTheme(cookies))
});

export default styled()(withCookies(connect(mapStateToProps, mapStateToDispatch)(geolocated()(App))));
