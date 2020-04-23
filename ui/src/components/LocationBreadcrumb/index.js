import LocationBreadcrumb from './LocationBreadcrumb';
import { connect } from 'react-redux';
import { styled } from '../../styles';
import { loadRegion, fetchSeriesByRegion } from '../../actions';

const mapStateToProps = state => {
  let locationTree = state.region.parents.slice(0);
  locationTree.reverse();
  locationTree.push(state.region);
  return {
    locations: locationTree
  };
}

const mapDispatchToProps = dispatch => (
  {
    loadRegion: selectedRegionId => {
      dispatch(loadRegion(selectedRegionId));
      dispatch(fetchSeriesByRegion(selectedRegionId));
    }
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(LocationBreadcrumb));
