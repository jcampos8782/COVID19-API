import {
  RECEIVE_SERIES_DATA,
  REQUEST_SERIES_BY_REGION_ID
} from '../actions/types';

export default (state = null, action) => {
    switch(action.type) {
        case RECEIVE_SERIES_DATA:
            return processData({...action});
        case REQUEST_SERIES_BY_REGION_ID:
            return null;
        default:
            return state;
    }
}

// TODO: a better fix Hack for now
const order = ["confirmed", "deaths", "recovered"]

const processData = ({region, series}) => {
  let aggregateDataItem = series.data.find(d => d.regions[0] === region.id);
  let subregionDataItems = series.data.filter(d => d.regions[0] !== region.id);

  let aggregateSeries = aggregateDataItem ?
      aggregateDataItem.data :
      aggregateData(series.data);

  // Stacked totals with day-to-day diffs
  let statistics = {};
  Object.keys(aggregateSeries).forEach(series => {
    statistics[series] = {};
    statistics[series]['aggregates'] = { total: [], daily: [] }
    statistics[series]['subregions'] = {}

    aggregateSeries[series].forEach((value,idx) => {
      let diff = idx > 0 ? value - aggregateSeries[series][idx - 1] : value;

      statistics[series]['aggregates']['total'].push(value);
      statistics[series]['aggregates']['daily'].push(diff);

      subregionDataItems.forEach(r => {
        let subregionId = r.regions[0];
        let subregion = region.subregions.find(s => s.id === subregionId);
        let subregionName = subregion ? subregion.name : subregionId;

        // If a data set includes a subregion not returned from the /regions/<id>
        // This shouldn't happen, but this is precautionary.
        if (subregion === null || subregion === undefined) {
          console.log(`Unable to locate subregion ${subregionId}. Skipping`);
          return;
        }

        // Its possible the data is not available in the subregions. Skip if thats the case
        if (!r.data[series]) {
          return;
        }

        statistics[series]['subregions'][subregionName] = {}
        statistics[series]['subregions'][subregionName]['current'] = r.data[series][r.data[series].length - 1]
        statistics[series]['subregions'][subregionName]['mostRecent'] = r.data[series][r.data[series].length - 1] - r.data[series][r.data[series].length - 2]
        statistics[series]['subregions'][subregionName]['total'] = r.data[series];
        statistics[series]['subregions'][subregionName]['daily'] = r.data[series].map((val,idx) => {
          return idx > 0 ? val - r.data[series][idx - 1] : val;
        });
      });
    });
  });

  return Object.keys(aggregateSeries).sort((a,b) => order.indexOf(a) - order.indexOf(b)).reduce((obj,series) => {
    let length = aggregateSeries[series].length;
    obj[series] = {
      current: aggregateSeries[series][length - 1],
      mostRecent: aggregateSeries[series][length - 1] - aggregateSeries[series][length - 2],
      aggregates: statistics[series].aggregates,
      regional: statistics[series].subregions
    };
    return obj;
  }, {});
}

// Aggregates the series from all data series supplied. Combines based on the series name
const aggregateData = (subregions) => {
  return subregions.reduce((obj,curr) => {
    Object.keys(curr.data).forEach(series => {
      if(!obj[series]) {
        obj[series] = Array.from({length: curr.data[series].length}, n => 0);
      }

      for(let i = 0; i < obj[series].length; i++) {
        obj[series][i] += curr.data[series][i];
      }
    });
    return obj;
  }, {});
}
