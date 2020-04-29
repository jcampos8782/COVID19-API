import Recent from './Recent';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {styled} from '../../styles';
import {setRecentPeriod} from '../../actions';
import {getData, getRecentFilterSettings} from '../../selectors';

const extractRecentData = createSelector(
  [getData, getRecentFilterSettings],
  (data, recentFilter) => ({
    keys: Object.keys(data),
    recent: Object.keys(data).reduce((obj, key) => {
      // Calculate last MAX_RECENT_PERIOD days of data from the diffs
      let len = data[key].aggregates.daily.length;
      obj[key] = data[key].aggregates.daily.slice(len-recentFilter.period)
      return obj;
    },{})
  })
);

const mapStateToProps = state => {
  const { data, series, view } = state;
  if (!(data && series)) {
    return { loading: true }
  }

  return {
    data: extractRecentData(state),
    theme: view.theme,
    period: view.recent.period,
    recentPeriodOptions: view.recent.options,
    columns: series.columns
  }
}

const mapDispatchToProps = dispatch => ({
  updatePeriod: period => dispatch(setRecentPeriod(period))
})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Recent));
