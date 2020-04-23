import Dashboard from './Dashboard';
import { selectTab, loadRegion } from '../../actions';
import { connect } from 'react-redux';
import {styled} from '../../styles';

const mapStateToProps = state => {
  if (state.data.length === 0 || state.region === null) {
    return { data: [] };
  }

  let currentSeries = state.series.current;
  let aggregateDataItem = state.data.find(d => d.regions[0] === state.region.id);
  let subregionDataItems = state.data.filter(d => d.regions[0] !== state.region.id);

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
        let subregion = state.region.subregions.find(s => s.id === subregionId);
        let subregionName = subregion ? subregion.name : subregionId;

        // If a data set includes a subregion not returned from the /regions/<id>
        // This shouldn't happen, but this is precautionary.
        if (subregion === null || subregion === undefined) {
          console.log(`Unable to locate subregion ${subregionId}. Skipping`);
          return;
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
    contacts: {
      www: "covid19.jsoncampos.com",
      twitter: "@whatever"
    },
    view: {
      ...state.view,
      icons: {
        confirmed: { className: "fas fa-head-side-cough", color: "white" },
        deaths: { className: "fas fa-skull-crossbones", color: "red" }
      },
    },
    meta: {
      region: state.region.name,
      currentRegion: state.region,
      currentSubregion:  state.region.subregions.find(s => s.id === state.filters.selectedSubregionId),
      subregions: state.region.subregions.map(r => r.name),
      columns: currentSeries.columns
    },
    headlines: state.headlines,
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
  selectTab: (e,t) => dispatch(selectTab(t)),
  loadRegion: (index, selectedRegionId) => dispatch(loadRegion(index, selectedRegionId))
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
