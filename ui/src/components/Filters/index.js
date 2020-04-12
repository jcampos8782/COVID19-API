import Filters from './Filters';
import {styled} from '../../styles';
import { connect } from 'react-redux';

import {
  selectRegion,
  unselectRegion,
  selectSubregion,
  unselectSubregion,
  selectLocale,
  unselectLocale,
  selectSeries,
  unselectSeries,
  fetchRegion,
  fetchSeriesByRegion,
} from '../../actions';

const mapStateToProps = state => {
  let subregions = [];
  if (state.regions.current !== null) {
    subregions = state.regions.current.subregions;
  }

  return {
    series: state.series.all,
    regions: state.regions.all,
    subregions: subregions,
    location: state.location,
    selectedSeriesId: state.filters.selectedSeriesId,
    selectedRegionId: state.filters.selectedRegionId,
    selectedSubregionId: state.filters.selectedSubregionId,
    selectedLocaleId: state.filters.selectedLocaleId
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

    selectRegion: (selectedRegionId, selectedSeriesId) => {
      dispatch(unselectSubregion());

      if (selectedRegionId === "-1") {
        dispatch(unselectRegion());
        return;
      }

      dispatch(selectRegion(selectedRegionId));
      dispatch(fetchRegion(selectedRegionId));

      if (selectedSeriesId !== -1) {
        dispatch(fetchSeriesByRegion(selectedSeriesId, selectedRegionId));
      }
    },

    selectSubregion:(id) => {
      if (id === "-1") {
        dispatch(unselectSubregion());
        return;
      }
      dispatch(selectSubregion(id));
    },

    selectLocale:(id) => {
      if (id === "-1") {
        dispatch(unselectLocale());
        return;
      }
      dispatch(selectLocale(id));
    }
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
