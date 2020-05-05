import Trends from './Trends';
import {connect} from 'react-redux';
import {styled} from '../../styles';
import {setTrendSeries, setTrendPeriod} from '../../actions';
import {extractTrendData, getColumnsForPeriod} from './selectors';

import {
  getTrendsFilterSettings,
  getTheme
} from '../../selectors';

const mapStateToProps = state => ({
  data: extractTrendData(state),
  theme: getTheme(state),
  columns: getColumnsForPeriod(state),
  ...getTrendsFilterSettings(state)
})

const mapDispatchToProps = dispatch => ({
  selectSeries: series => dispatch(setTrendSeries(series)),
  selectPeriod: period => dispatch(setTrendPeriod(period))
})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(Trends));
