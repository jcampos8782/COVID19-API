import Filters from './Filters';

import { connect } from 'react-redux';

import {
  selectRegion,
  unselectRegion,
  selectSubregion,
  unselectSubregion,
  fetchRegion,
  fetchRegions,
  fetchSeriesByRegion,
} from '../../actions';

const mapStateToProps = state => {
  let subregions = [];
  if (state.regions.current !== null) {
    subregions = state.regions.current.subregions;
  }

  return {
    regions: state.regions.all,
    subregions: subregions,
    selectedRegionId: state.filters.selectedRegionId,
    selectedSubregionId: state.filters.selectedSubregionId
  };
};

const mapDispatchToProps = dispatch => ({
    fetchRegions: () => dispatch(fetchRegions()),
    selectRegion: (id) => {
      if (id === "-1") {
        dispatch(unselectRegion());
        dispatch(unselectSubregion());
        return;
      }
      dispatch(unselectSubregion());
      dispatch(selectRegion(id));
      dispatch(fetchSeriesByRegion(id));
      dispatch(fetchRegion(id));
    },

    selectSubregion:(id) => {
      if (id === "-1") {
        dispatch(unselectSubregion());
        return;
      }
      dispatch(selectSubregion(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
