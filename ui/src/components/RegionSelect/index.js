import RegionSelect from './RegionSelect';

import { connect } from 'react-redux';

import {
  selectRegion,
  unselectRegion,
  fetchRegion,
  fetchRegions,
  fetchSeriesByRegion,
} from '../../actions';

const mapStateToProps = state => ({
  options: state.regions.all,
  selectedRegionId: state.regionsFilter.selectedRegionId
});

const mapDispatchToProps = dispatch => ({
    selectRegion: (id) => {
      if (id === "-1") {
        dispatch(unselectRegion());
        return;
      }
      dispatch(selectRegion(id));
      dispatch(fetchSeriesByRegion(id));
      dispatch(fetchRegion(id));
    },
    fetchRegions: () => dispatch(fetchRegions())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionSelect);
