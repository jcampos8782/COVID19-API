import Dashboard from './Dashboard';
import { selectDashboardTab } from '../../actions';
import { connect } from 'react-redux';
import {styled} from '../../styles';

const mapStateToProps = state => {
  if (state.data.length === 0 || state.regions.current === null) {
    return { data: [] };
  }

  let currentSeries = state.series.current;

  let aggregateDataItem = state.data.find(d => d.regions[0] === state.regions.current.id);
  let subregionDataItems = state.data.filter(d => d !== aggregateDataItem);

  if (state.filters.selectedSubregionId !== -1) {
    aggregateDataItem = subregionDataItems.find(d => state.filters.selectedSubregionId === d.regions[0]);
  }

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

    // Calculate last 7 days of data from the diffs
    let len = statistics[series].aggregates.total.length;
    statistics[series]['recent'] = {
        total: statistics[series].aggregates.total[len - 1] - statistics[series].aggregates.total[len - 8],
        data: statistics[series].aggregates.daily.slice(len-7)
    };
  });

  return {
    view: {
      theme: state.theme,
      selectedTabId: state.filters.selectedTabId,
      icons: {
        confirmed: { className: "fas fa-head-side-cough", color: "white" },
        deaths: { className: "fas fa-skull-crossbones", color: "red" }
      },
    },
    meta: {
      region: state.regions.current.name,
      currentSubregion:  state.regions.current.subregions.find(s => s.id === state.filters.selectedSubregionId),
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
          recent: statistics[series].recent,
          regions: statistics[series].subregions
        }
      };
    })
  };
};

let mapDispatchToProps = dispatch => ({
  selectTab: (e,t) => dispatch(selectDashboardTab(t))
});

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

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
