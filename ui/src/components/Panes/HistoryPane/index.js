import HistoryPane from './HistoryPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getCovid19Data, getDataKeys, getTheme, getSeriesDataColumns } from '../../../selectors';

const extractHistoryData = createSelector(
  [getCovid19Data],
  data => data
    ? Object.keys(data).reduce((obj,key) => {
        obj[key] = {
          current: data[key].current,
          aggregate: data[key].aggregates.total,
          daily: data[key].aggregates.daily
        };
        return obj;
      }, {})
    : null
);

const mapStateToProps = state => ({
  data: extractHistoryData(state),
  theme: getTheme(state),
  keys: getDataKeys(state),
  columns: getSeriesDataColumns(state),
})

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(HistoryPane));
