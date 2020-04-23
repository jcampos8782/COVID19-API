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
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Filters));
