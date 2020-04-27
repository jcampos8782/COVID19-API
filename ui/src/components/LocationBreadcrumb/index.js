import LocationBreadcrumb from './LocationBreadcrumb';
import { connect } from 'react-redux';
import { styled } from '../../styles';
import { loadRegion, fetchSeriesByRegion, error } from '../../actions';

const mapStateToProps = state => {
  if (!state.region) {
    return {loading: true}
  };

  let locationTree = state.region.parents.slice(0);
  locationTree.reverse();
  locationTree.push(state.region);

  return {
    locations: locationTree,
  };
}

const mapDispatchToProps = dispatch => (
  {
    loadRegion: id => {
      dispatch(loadRegion(id)).then(
        region => dispatch(fetchSeriesByRegion(region)),
        e => dispatch(error(e))
      );
    }
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(LocationBreadcrumb));
