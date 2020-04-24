import SummaryPane from './SummaryPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

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
            obj[key] = data[key].recent.data
            return obj;
        },{}),
        // Day X to Day x - 7 percentage increase/decrease
        weeklyRateOfChange: Object.keys(data).reduce((obj,key) => {
          let values = data[key].aggregates.daily;
          obj[key] = values.map((val, idx) => {
            let current = values[idx];
            let lastWeek = idx > 7 ? values[idx - 7] : values[0];
            let difference = current - lastWeek;
            let denom = lastWeek === 0 ? 1 : lastWeek;
            let percentChange = ((difference / denom) * 100).toFixed(2);
            return parseFloat(percentChange);
          });
          return obj;
        }, {})
      },
      theme: view.theme,
      columns: series.columns
    }
}

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(SummaryPane));
