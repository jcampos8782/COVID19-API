import RegionSelect from './RegionSelect';

import { connect } from 'react-redux';
import { selectRegion } from '../../actions';

const mapStateToProps = state => ({ ...state.regionFilter });

const mapDispatchToProps = dispatch => ({
    selectRegion: (id) => dispatch(selectRegion(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionSelect);
