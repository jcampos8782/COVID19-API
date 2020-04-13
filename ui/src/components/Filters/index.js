import Filters from './Filters';
import {styled} from '../../styles';
import { connect } from 'react-redux';

import {
  selectRegion,
  unselectRegion,
  selectSeries,
  unselectSeries,
  fetchRegion,
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

    selectRegion: (selectedRegionId, index, selectedSeriesId) => {

      if (selectedRegionId === "-1") {
        dispatch(unselectRegion(index));
        return;
      }

      dispatch(selectRegion(selectedRegionId, index));
      dispatch(fetchRegion(selectedRegionId));

      if (selectedSeriesId !== -1) {
        dispatch(fetchSeriesByRegion(selectedSeriesId, selectedRegionId));
      }
    },
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
