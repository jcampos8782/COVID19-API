import TimeSeriesLineChart from './TimeSeriesLineChart';
import { connect } from 'react-redux';

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

  /*
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
  */

  return {
    data: Object.keys(aggregateSeries).map(series => {
      return {
        id: series,
        data: aggregateSeries[series].map((value,idx) => ({
          x: formatDate(Date.parse(currentSeries.columns[idx])),
          y: value
        }))
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

export default connect(mapStateToProps)(TimeSeriesLineChart);
