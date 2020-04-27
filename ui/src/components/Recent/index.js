import Recent from './Recent';
import {connect} from 'react-redux';
import {styled} from '../../styles';
import {setRecentPeriod} from '../../actions';

const mapStateToProps = state => {
  const { data, series, view } = state;
  if (!(data && series)) {
    return { loading: true }
  }

  return {
    data: {
      keys: Object.keys(data),
      // Last X days
      recent: Object.keys(data).reduce((obj, key) => {
        // Calculate last MAX_RECENT_PERIOD days of data from the diffs
        let len = data[key].aggregates.daily.length;
        obj[key] = data[key].aggregates.daily.slice(len-view.recentPeriod)
        return obj;
      },{}),
    },
    theme: view.theme,
    period: view.recentPeriod,
    recentPeriodOptions: view.recentPeriodOptions,
    columns: series.columns
  }
}

const mapDispatchToProps = dispatch => ({
  updatePeriod: period => dispatch(setRecentPeriod(period))
})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Recent));
