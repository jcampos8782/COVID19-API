import LocationBreadcrumb from './LocationBreadcrumb';
import { connect } from 'react-redux';
import { styled } from '../../styles';
import { loadRegion, fetchSeriesByRegion, error } from '../../actions';

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
    loadRegion: id => {
      new Promise((resolve,reject) => {
        let region = dispatch(loadRegion(id));
        if (region) {
          resolve();
        } else {
          reject("Failed to load region");
        }
      })
      .then(
        () => dispatch(fetchSeriesByRegion(id)),
        e => error(e)
      );
    }
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(LocationBreadcrumb));
