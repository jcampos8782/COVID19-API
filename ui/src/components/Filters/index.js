import Filters from './Filters';
import {styled} from '../../styles';
import { connect } from 'react-redux';

import {
  loadRegion,
  selectSeries,
  unselectSeries,
  fetchSeriesByRegion,
} from '../../actions';

const mapStateToProps = state => {
  return {
    series: state.series.all,
    regions: state.filters.regionFilters,
    location: state.location,
    selectedSeriesId: state.filters.selectedSeriesId,
    selectedRegionId: state.regions.current ? state.regions.current.id : -1
  };
};

const mapDispatchToProps = dispatch => ({
    selectSeries: (selectedSeriesId, selectedRegionId) => {
      if (selectedSeriesId === "-1") {
        dispatch(unselectSeries());
        return;
      }
      dispatch(selectSeries(selectedSeriesId));

      if (selectedRegionId !== -1) {
          dispatch(fetchSeriesByRegion(selectedSeriesId, selectedRegionId))
      }
    },

    selectRegion: (index, selectedRegionId) => dispatch(loadRegion(index, selectedRegionId))
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
