import Trends from './Trends';
import {connect} from 'react-redux';
import {styled} from '../../styles';

import {setTrendSeries, setTrendPeriod} from '../../actions';

const getBaseLog = (x, y) => Math.log(y) / Math.log(x);

const mapStateToProps = state => {
  const { data, series, view } = state;
  if (!(data && series)) {
    return { loading: true }
  }

  return {
    data: {
      keys: Object.keys(data),
      trends: calculateTrends(data)
    },
    theme: view.theme,
    columns: series.columns,
    ...view.trends
  }
}

const mapDispatchToProps = dispatch => ({
  selectSeries: series => dispatch(setTrendSeries(series)),
  selectPeriod: period => dispatch(setTrendPeriod(period))
})

const calculateTrends = data => (
  Object.keys(data).reduce((obj, series) => {
    let totals = data[series].aggregates.total;
    let daily = data[series].aggregates.daily;

    // Divide each day by the total for that day
    let growth = daily.map((n,i) => {
      let total = totals[i];

      // No growth if there is no total or if on day 0
      if (total === 0 || i === 0) {
        return 0;
      }
      return 100 * (n/total);
    });

    let rollingGrowth = growth.map((dailyRate, i) => {
      // determining the start and end locations in the array for each particular day
      let start = i < 7 ? 1 : i - 6;
      let end = i < 7 ? i + 2 : i + 1;

      let period = growth.slice(start, end);
      return parseFloat((period.reduce((a,b) => a + b) / period.length).toFixed(2));
    })

    // calculating the doubling time using the compounding growth formula: CGR = ((vFinal/vInitial)^(1/time))-1
    // vInitial is the current number of cases
    // vFinal is just double vInitial
    // CGR is the latest rollingGrowth average
    // then solve for t
    let x = 1 + (rollingGrowth[rollingGrowth.length-1])/100;
    let y = (totals[totals.length - 1] * 2)/totals[totals.length - 1];
    obj[series] = {
      daily: growth,
      rolling: rollingGrowth,
      doubling: Math.ceil(getBaseLog(x,y))
    };

    return obj;
  }, {})
);

export default styled()(connect(mapStateToProps,mapDispatchToProps)(Trends));
