import Recent from './Recent';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {styled} from '../../styles';
import {setRecentPeriod} from '../../actions';
import {
  getData,
  getTheme,
  getSeriesDataColumns,
  getRecentFilterSettings
} from '../../selectors';

const extractRecentData = createSelector(
  [getData, getRecentFilterSettings],
  (data, recentFilter) =>
    data
      ? ({
        keys: Object.keys(data),
        recent: Object.keys(data).reduce((obj, key) => {
          // Calculate last MAX_RECENT_PERIOD days of data from the diffs
          let len = data[key].aggregates.daily.length;
          obj[key] = data[key].aggregates.daily.slice(len-recentFilter.period)
          return obj;
        },{})
      })
      : null
);

const mapStateToProps = state => ({
  data: extractRecentData(state),
  theme: getTheme(state),
  period: getRecentFilterSettings(state).period,
  recentPeriodOptions: getRecentFilterSettings(state).options,
  columns: getSeriesDataColumns(state)
})

const mapDispatchToProps = dispatch => ({
  updatePeriod: period => dispatch(setRecentPeriod(period))
})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Recent));
