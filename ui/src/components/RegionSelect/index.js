import RegionSelect from './RegionSelect';

import { connect } from 'react-redux';

import {
  selectRegion,
  unselectRegion,
  fetchRegions,
  fetchCasesByRegion,
  fetchMunicipalities
} from '../../actions';

const mapStateToProps = state => ({
  options: state.regions,
  selectedRegionId: state.regionsFilter.selectedRegionId
});

const mapDispatchToProps = dispatch => ({
    selectRegion: (id) => {
      if (id === "-1") {
        dispatch(unselectRegion());
        return;
      }
      dispatch(selectRegion(id));
      dispatch(fetchCasesByRegion(id));
      dispatch(fetchMunicipalities(id));
    },
    fetchRegions: () => dispatch(fetchRegions())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionSelect);
