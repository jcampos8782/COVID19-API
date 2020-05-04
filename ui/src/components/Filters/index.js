import Filters from './Filters';
import {styled} from '../../styles';
import { connect } from 'react-redux';
import {loadRegion, fetchSeriesByRegion, error} from '../../actions';
import {getRegionFilters, getCovid19Series} from '../../selectors';

const mapStateToProps = state => ({
  filters: getRegionFilters(state),
  series: getCovid19Series(state)
})

const mapDispatchToProps = dispatch => ({
    loadRegion: (id, series) => {
      // ignore if we get invalid input
      if (id === -1) {
        return;
      }

      dispatch(loadRegion(id))
        .then(
          region => dispatch(fetchSeriesByRegion(series, region)),
          e => dispatch(error(e))
        )
        .catch(e => dispatch(error(e)));
    }
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
