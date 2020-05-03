import Recent from './Recent';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {styled} from '../../styles';
import {setRecentPeriod, setRecentSeries} from '../../actions';
import {
  getData,
  getDataKeys,
  getTheme,
  getRegion,
  getSeries,
  getSeriesDataColumns,
  getRecentFilterSettings
} from '../../selectors';

const MAX_REGIONS = 9;

const extractSubregionsData = createSelector(
  [getData, getSeries],
  (data, series) => (
    data
    ? Object.keys(data).reduce((obj,key) => {
        let regionalData = data[key].regional;
        let regionNames = Object.keys(regionalData);

        // List of region names sorted by total
        let regionsSortedByTotal = regionNames.map(region => ({ region, total: regionalData[region].current }))
          .sort((a,b) => b.total - a.total)
          .map(r => r.region)

        let topRegionNames = regionsSortedByTotal.slice(0, MAX_REGIONS);
        let topRegionData = topRegionNames.reduce((obj,region) => {
          obj[region] = regionalData[region].daily;
          return obj;
        }, {});

        // Aggregate all others into a single "Others"
        let otherRegionNames = regionsSortedByTotal.slice(MAX_REGIONS);
        let otherRegionsAggregate = Array.from({length: series.columns.length}, n => 0);
        otherRegionNames.forEach(region => {
          regionalData[region].daily.forEach((val,idx) => {
            otherRegionsAggregate[idx] += val;
          })
        });

        obj[key] = {...topRegionData, Others: otherRegionsAggregate};

        return obj;
      }, {})
    : null
  )
);

const getDataForPeriod = createSelector(
  [getData, extractSubregionsData, getRegion, getRecentFilterSettings],
  (data, subregionData, region, filter) => {
    if (!(data && region)) {
      return null;
    }

    if (!data[filter.selectedSeries]) {
      return { [region.name]: [] }
    }

    // If there are subregions, aggregate their data. Otherwise just use the
    // daily data for the region.
    if (subregionData[filter.selectedSeries] && Object.keys(subregionData[filter.selectedSeries]).length > 1) {
      return Object.keys(subregionData[filter.selectedSeries]).reduce((obj, region) => {
        obj[region] = subregionData[filter.selectedSeries][region].slice(-filter.selectedPeriod);
        return obj;
      }, {});
    }

    return { [region.name]: data[filter.selectedSeries].aggregates.daily.slice(-filter.selectedPeriod) }
  });

const getColumnsForPeriod = createSelector(
  [getSeriesDataColumns, getRecentFilterSettings],
  (columns, filter) => columns ? columns.slice(-filter.selectedPeriod) : null
);

const mapStateToProps = state => ({
  data: getDataForPeriod(state),
  keys: getDataKeys(state),
  theme: getTheme(state),
  columns: getColumnsForPeriod(state),
  ...getRecentFilterSettings(state)
});

const mapDispatchToProps = dispatch => ({
  selectSeries: series => dispatch(setRecentSeries(series)),
  selectPeriod: period => dispatch(setRecentPeriod(period))
})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Recent));
