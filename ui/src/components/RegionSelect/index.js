import RegionSelect from './RegionSelect';

import { connect } from 'react-redux';
import { selectRegion, fetchRegions, fetchCasesByRegion } from '../../actions';

const mapStateToProps = state => ({ ...state.regionFilter });

const mapDispatchToProps = dispatch => ({
    selectRegion: (id) => {
      dispatch(selectRegion(id));
      if(id !== -1) {
        dispatch(fetchCasesByRegion(id));  
      }
    },
    fetchRegions: () => dispatch(fetchRegions())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionSelect);
