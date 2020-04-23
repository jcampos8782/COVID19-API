import Filters from './Filters';
import {styled} from '../../styles';
import { connect } from 'react-redux';
import {loadRegion, fetchSeriesByRegion} from '../../actions';

const mapStateToProps = state => {
  return {
    regions: state.view.filters,
    location: state.location,
    selectedRegionId: state.region ? state.region.id : -1
  };
};

const mapDispatchToProps = dispatch => ({
    loadRegion: id => {
      dispatch(loadRegion(id));
      dispatch(fetchSeriesByRegion(id));
    }
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
