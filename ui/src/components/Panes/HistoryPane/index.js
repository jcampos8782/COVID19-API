import HistoryPane from './HistoryPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const {data, series, view} = state;

  return {
    data: Object.keys(data).reduce((obj,key) => {
      obj[key] = {
        current: data[key].current,
        aggregate: data[key].aggregates.total,
        daily: data[key].aggregates.daily
      };
      return obj;
    }, {}),
    theme: view.theme,
    keys: Object.keys(data),
    columns: series.columns,
  }
}

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(HistoryPane));
