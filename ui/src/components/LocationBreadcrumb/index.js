import LocationBreadcrumb from './LocationBreadcrumb';
import { connect } from 'react-redux';
import { styled } from '../../styles';
import { loadRegion } from '../../actions';

const mapStateToProps = state => {
  let locationTree = state.regions.current.parents.slice(0);
  locationTree.reverse();
  locationTree.push(state.regions.current);
  return {
    locations: locationTree
  };
}

const mapDispatchToProps = dispatch => (
  {
    loadRegion: (index, selectedRegionId) => dispatch(loadRegion(index, selectedRegionId))
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(LocationBreadcrumb));
