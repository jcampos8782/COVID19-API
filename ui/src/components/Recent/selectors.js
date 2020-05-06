import {createSelector} from 'reselect';

import {
  getCovid19Data,
  getRegion,
  getCovid19Columns,
  getRecentFilterSettings
} from '../../selectors';

const MAX_REGIONS = 9;

export const extractSubregionsData = createSelector(
  [getCovid19Data, getCovid19Columns],
  (data, columns) => (
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
        let otherRegionsAggregate = Array.from({length: columns.length}, n => 0);
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

export const getDataForPeriod = createSelector(
  [getCovid19Data, extractSubregionsData, getRegion, getRecentFilterSettings],
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

export const getColumnsForPeriod = createSelector(
  [getCovid19Columns, getRecentFilterSettings],
  (columns, filter) => columns ? columns.slice(-filter.selectedPeriod) : null
);

export const getAvailableSeries = createSelector(
  [getCovid19Data], data => data ? Object.keys(data) : []
)
