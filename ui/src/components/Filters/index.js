import Filters from './Filters';
import {styled} from '../../styles';
import { connect } from 'react-redux';

import {
  loadRegion,
} from '../../actions';

const mapStateToProps = state => {
  return {
    series: state.series.all,
    regions: state.filters.regionFilters,
    location: state.location,
    selectedSeriesId: state.filters.selectedSeriesId,
    selectedRegionId: state.region ? state.region.id : -1
  };
};

const mapDispatchToProps = dispatch => ({
    selectRegion: (index, selectedRegionId) => dispatch(loadRegion(index, selectedRegionId))
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
