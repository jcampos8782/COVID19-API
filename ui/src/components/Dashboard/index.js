import Dashboard from './Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  if (state.data.length === 0 || state.regions.current === null) {
    return { data: [] };
  }

  let currentSeries = state.series.current;

  // There may be no item specific to the region. If thats the case, aggregate
  // the data manually.
  let aggregateDataItem = state.data.find(d => d.regions.length === 1);
  let subregionDataItems = state.data.filter(d => d !== aggregateDataItem);

  let aggregateSeries = aggregateDataItem ?
      aggregateDataItem.data :
      aggregateData(state.data);


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
        let subregion = state.regions.current.subregions.find(s => s.id === subregionId);
        let subregionName = subregion ? subregion.name : subregionId;

        // If a data set includes a subregion not returned from the /regions/<id>
        // This shouldn't happen, but this is precautionary.
        if (subregion === null) {
          console.log(`Unable to locate subregion ${subregionId}. Using ID as name`);
        }

        statistics[series]['subregions'][subregionName] = {}
        statistics[series]['subregions'][subregionName]['total'] = r.data[series];
        statistics[series]['subregions'][subregionName]['daily'] = r.data[series].map((val,idx) => {
          return idx > 0 ? val - r.data[series][idx - 1] : val;
        });
      });
    });
  });

  return {
    meta: {
      subregions: state.regions.current.subregions.map(r => r.name),
      columns: currentSeries.columns
    },
    data: Object.keys(aggregateSeries).map(series => {
      let length = aggregateSeries[series].length;
      return {
        id: series,
        current: aggregateSeries[series][length - 1],
        data: {
          aggregates: statistics[series].aggregates,
          regions: statistics[series].subregions
        }
      };
    })
  };
};

// Aggregates the series from all data series supplied. Combines based on the series name
let aggregateData = (subregions) => {
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

export default connect(mapStateToProps)(Dashboard);
