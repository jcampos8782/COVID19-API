import Dashboard from './Dashboard';
import { connect } from 'react-redux';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US');

const mapStateToProps = state => {
  if (state.data.length === 0 || state.regions.current === null) {
    return { data: [] };
  }

  let currentSeries = state.series.current;

  // There may be no item specific to the region. If thats the case, aggregate
  // the data manually.
  let aggregateDataItem = state.data.find(d => d.regions.length === 1);
  let aggregateSeries = aggregateDataItem ?
      aggregateDataItem.data :
      aggregateData(state.data);

  let subregionDataItems = state.data.filter(d => d !== aggregateDataItem);
  let subregionSeries = subregionDataItems.map(r => {
    // Regions are listed in hierarchical order. The first is the finest grained
    let subregionId = r.regions[0];
    let subregion = state.regions.current.subregions.find(s => s.id === subregionId);
    let subregionName = subregion ? subregion.name : subregionId;

    // If a data set includes a subregion not returned from the /regions/<id>
    // This shouldn't happen, but this is precautionary.
    if (subregion === null) {
      console.log(`Unable to locate subregion ${subregionId}. Using ID as name`);
    }

    return {
      id: subregionId,
      region: subregionName,
      series: r.data
    }
  });

  // Sort on the region name
  subregionSeries.sort((a,b) => a.region < b.region);

  // series name -> totals for series
  let totals = {};
  // day-to-day diffs
  let diffs = {};
  // Stacked totals with day-to-day diffs
  let stacked = {};

  let dateGroups = {};

  Object.keys(aggregateSeries).forEach(series => {
    totals[series] = [];
    diffs[series] = [];
    stacked[series] = { total: [], daily: [] }
    dateGroups[series] = [];

    aggregateSeries[series].forEach((value,idx) => {
      let dateString = currentSeries.columns[idx];
      let date = formatDate(Date.parse(dateString));
      let diff = idx > 0 ? value - aggregateSeries[series][idx - 1] : value;

      let t = {x: date, y: value};
      let d = {x: date, y: diff};

      totals[series].push(t);
      diffs[series].push(d);
      stacked[series]['total'].push(t);
      stacked[series]['daily'].push(d);

      if(subregionSeries.length > 0) {
        dateGroups[series].push({
          id: dateString,
          ...subregionSeries.reduce((obj,curr) => {
            obj[curr.region] = idx > 0 ? curr.series[series][idx] - curr.series[series][idx - 1]: curr.series[series][idx];
            return obj;
          }, {})
        });
      }
    });
  });

  return {
    meta: {
      subregions: state.regions.current.subregions.map(r => r.name)
    },
    data: Object.keys(aggregateSeries).map(series => {
      let length = aggregateSeries[series].length;
      return {
        id: series,
        current: aggregateSeries[series][length - 1],
        totals: totals[series],
        diffs: diffs[series],
        stacked: stacked[series],
        regions: dateGroups[series]
      };
    })
  };
};

let formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

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
