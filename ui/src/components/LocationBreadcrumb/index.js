import LocationBreadcrumb from './LocationBreadcrumb';
import { connect } from 'react-redux';
import { styled } from '../../styles';
import { loadRegion, fetchSeriesByRegion, error } from '../../actions';
import { getRegionHeirarchy, getCovid19Series } from '../../selectors';

const mapStateToProps = state => ({
    locations: getRegionHeirarchy(state),
    series: getCovid19Series(state)
})

const mapDispatchToProps = dispatch => (
  {
    loadRegion: (id, series) => {
      dispatch(loadRegion(id))
        .then(
          region => dispatch(fetchSeriesByRegion(series, region)),
          e => dispatch(error(e))
        )
        .catch(e => dispatch(error(e)));
    }
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(LocationBreadcrumb));
