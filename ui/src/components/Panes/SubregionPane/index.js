import SubregionPane from './SubregionPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

const MAX_REGIONS = 9;

const mapStateToProps = state => {
  const {data, region, view, series} = state;

  return {
    theme: view.theme,
    columns: series.columns,
    title: region.name,
    data: Object.keys(data).reduce((obj,key) => {
      let regionalData = data[key].regional;
      let regionNames = Object.keys(regionalData);

      // List of region names sorted by total
      let regionsSortedByTotal = regionNames.map(region => ({ region, total: regionalData[region].current }))
        .sort((a,b) => b.total - a.total)
        .map(r => r.region)

      let topRegionNames = regionsSortedByTotal.slice(0, MAX_REGIONS);
      let topRegionData = topRegionNames.reduce((obj,region) => {
        obj[region] = regionalData[region];
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

      obj[key] = {
        all: regionalData,
        top: topRegionData,
        others: otherRegionsAggregate,
      };

      return obj;
    }, {})
  }
};

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(SubregionPane));