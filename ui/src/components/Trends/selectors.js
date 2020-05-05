import { createSelector } from 'reselect';

import {
  getCovid19Data,
  getFacts,
  getRegion,
  getCovid19Columns,
  getTrendsFilterSettings,
} from '../../selectors';

const getBaseLog = (x, y) => Math.log(y) / Math.log(x);

export const extractTrendData = createSelector(
  [getCovid19Data, getRegion, getFacts, getTrendsFilterSettings],
  (data, region, facts, filter) => {
    if (!(data && region && facts)) {
      return null;
    }

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
      trends: calculateTrends(data, filter.selectedPeriod, filter)
    };
  }
);

export const getColumnsForPeriod = createSelector(
  [getCovid19Columns, getTrendsFilterSettings],
  (columns, filter) => columns ? columns.slice(-filter.selectedPeriod) : null
)

const calculateTrends = (data, period, filter) => (
  filter.seriesOptions.reduce((obj, series) => {
    if (!data[series]) {
      obj[series] = { daily: [], rolling: [], doubling: null }
      return obj;
    }

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
