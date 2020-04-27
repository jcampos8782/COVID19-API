import Filters from './Filters';
import {styled} from '../../styles';
import { connect } from 'react-redux';
import {loadRegion, fetchSeriesByRegion, error} from '../../actions';

const mapStateToProps = state => {
  return {
    regions: state.view.filters,
    location: state.location,
    selectedRegionId: state.region ? state.region.id : -1
  };
};

const mapDispatchToProps = dispatch => ({
    loadRegion: (id) => {
      // ignore if we get invalid input
      if (id === "-1") {
        return;
      }

      dispatch(loadRegion(id)).then(
        region => dispatch(fetchSeriesByRegion(region)),
        e => dispatch(error(e))
      );
    }
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
