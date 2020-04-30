import LocationBreadcrumb from './LocationBreadcrumb';
import { connect } from 'react-redux';
import { styled } from '../../styles';
import { loadRegion, fetchSeriesByRegion, error } from '../../actions';
import { getRegionHeirarchy } from '../../selectors';

const mapStateToProps = state => ({
    locations: getRegionHeirarchy(state),
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
