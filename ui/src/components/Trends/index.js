import Trends from './Trends';
import {connect} from 'react-redux';
import {styled} from '../../styles';
import { createSelector } from 'reselect';
import {setTrendSeries, setTrendPeriod} from '../../actions';
import {getData, getRegion, getSeries, getTrendsFilterSettings} from '../../selectors';

const getBaseLog = (x, y) => Math.log(y) / Math.log(x);

const extractData = createSelector(
  [getData, getRegion, getTrendsFilterSettings],
  (data, region, filter) => {
    let facts = {...region.facts};
    
    if (!facts.sipOrderDate) {
      for(let i = 0; i < region.parents.length; i++) {
        if (region.parents[i].facts.sipOrderDate) {
          facts.sipOrderDate = region.parents[i].facts.sipOrderDate;
          break;
        }
      }
    }

    return {
      keys: Object.keys(data),
      sipOrderDate: new Date(facts.sipOrderDate),
      trends: calculateTrends(data, filter.selectedPeriod)
    };
  }
);

const getColumnsForPeriod = createSelector(
  [getSeries, getTrendsFilterSettings],
  (series, filter) => series.columns.slice(-filter.selectedPeriod)
)

const calculateTrends = (data,period) => (
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
      return parseFloat((100 * (n/total)).toFixed(2));
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
      daily: growth.slice(-period),
      rolling: rollingGrowth.slice(-period),
      doubling: Math.ceil(getBaseLog(x,y))
    };

    return obj;
  }, {})
);


const mapStateToProps = state => {
  const { data, series, region, view } = state;
  if (!(data && series && region)) {
    return { loading: true }
  }

  return {
    data: extractData(state),
    theme: view.theme,
    columns: getColumnsForPeriod(state),
    ...view.trends
  }
}

const mapDispatchToProps = dispatch => ({
  selectSeries: series => dispatch(setTrendSeries(series)),
  selectPeriod: period => dispatch(setTrendPeriod(period))
})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(Trends));
