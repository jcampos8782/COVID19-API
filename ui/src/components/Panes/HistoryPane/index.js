import HistoryPane from './HistoryPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getData, getKeys } from '../../../selectors';

const extractData = createSelector(
  [getData],
  data => Object.keys(data).reduce((obj,key) => {
    obj[key] = {
      current: data[key].current,
      aggregate: data[key].aggregates.total,
      daily: data[key].aggregates.daily
    };
    return obj;
  }, {})
);

const mapStateToProps = state => {
  const {data, series, view} = state;
  if (!(data && series)) {
    return { loading: true }
  }
  return {
    data: extractData(state),
    theme: view.theme,
    keys: getKeys(state),
    columns: series.columns,
  }
}

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(HistoryPane));
