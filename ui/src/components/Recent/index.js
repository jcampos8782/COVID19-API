import Recent from './Recent';
import {connect} from 'react-redux';
import {styled} from '../../styles';
import {setRecentPeriod, setRecentSeries} from '../../actions';
import {getDataForPeriod, getColumnsForPeriod, getAvailableSeries } from './selectors';

import {
  getTheme,
  getRecentFilterSettings
} from '../../selectors';

const mapStateToProps = state => ({
  data: getDataForPeriod(state),
  series: getAvailableSeries(state),
  theme: getTheme(state),
  columns: getColumnsForPeriod(state),
  ...getRecentFilterSettings(state)
});

const mapDispatchToProps = dispatch => ({
  selectSeries: series => dispatch(setRecentSeries(series)),
  selectPeriod: period => dispatch(setRecentPeriod(period))
})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Recent));
