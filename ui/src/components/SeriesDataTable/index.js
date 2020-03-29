import SeriesDataTable from './SeriesDataTable';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  if (state.data.length === 0 || state.regions.current === null) {
    return { data: null };
  }

  let aggregateDataItem = state.data.find(d => d.regions.length === 1);
  return {
    data: {
      aggregate: {
        region: state.regions.current.name,
        series: aggregateDataItem ? aggregateDataItem.data : []
      },
      subregions: state.data.filter(d => d.regions[0] !== state.regions.current.id).map(r => {
        return {
          region: state.regions.current.subregions.find(subregion => subregion.id === r.regions[0]).name,
          series: r.data
        }
      }).sort((a,b) => a.region < b.region)
    }
  };
};

export default connect(mapStateToProps)(SeriesDataTable);
