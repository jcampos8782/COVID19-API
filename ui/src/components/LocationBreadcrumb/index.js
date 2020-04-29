import LocationBreadcrumb from './LocationBreadcrumb';
import { connect } from 'react-redux';
import { styled } from '../../styles';
import { loadRegion, fetchSeriesByRegion, error } from '../../actions';
import { createSelector } from 'reselect'
import { getRegion } from '../../selectors';

const getLocationTree = createSelector(
  [getRegion],
  region => {
    if (!region) {
      return null;
    }

    let locationTree = region.parents.slice(0);
    locationTree.reverse();
    locationTree.push(region);
    return locationTree;
  }
);

const mapStateToProps = state => ({
    loading: !state.region,
    locations: getLocationTree(state),
})

const mapDispatchToProps = dispatch => (
  {
    loadRegion: id => {
      dispatch(loadRegion(id))
        .then(
          region => dispatch(fetchSeriesByRegion(region)),
          e => dispatch(error(e))
        )
        .catch(e => dispatch(error(e)));
    }
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(LocationBreadcrumb));
