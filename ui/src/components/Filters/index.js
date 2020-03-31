import Filters from './Filters';

import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  selectRegion,
  unselectRegion,
  selectSubregion,
  unselectSubregion,
  selectSeries,
  unselectSeries,
  fetchRegion,
  fetchSeriesByRegion,
} from '../../actions';

const mapStateToProps = state => {
  let subregions = [];
  if (state.regions.current !== null) {
    subregions = state.regions.current.subregions;
  }

  return {
    series: state.series.all,
    regions: state.regions.all,
    subregions: subregions,
    selectedSeriesId: state.filters.selectedSeriesId,
    selectedRegionId: state.filters.selectedRegionId,
    selectedSubregionId: state.filters.selectedSubregionId
  };
};

const mapDispatchToProps = dispatch => ({
    selectSeries: (selectedSeriesId, selectedRegionId) => {
      if (selectedSeriesId === "-1") {
        dispatch(unselectSeries());
        return;
      }
      dispatch(selectSeries(selectedSeriesId));

      if (selectedRegionId !== -1) {
          dispatch(fetchSeriesByRegion(selectedSeriesId, selectedRegionId))
      }
    },

    selectRegion: (selectedRegionId, selectedSeriesId) => {
      dispatch(unselectSubregion());

      if (selectedRegionId === "-1") {
        dispatch(unselectRegion());
        return;
      }

      dispatch(selectRegion(selectedRegionId));
      dispatch(fetchRegion(selectedRegionId));

      if (selectedSeriesId !== -1) {
        dispatch(fetchSeriesByRegion(selectedSeriesId, selectedRegionId));
      }
    },

    selectSubregion:(id) => {
      if (id === "-1") {
        dispatch(unselectSubregion());
        return;
      }
      dispatch(selectSubregion(id));
    }
});

const styles = theme => ({
  filters: {
    "& > div": {
      display: 'inline-block',
      paddingRight: 10
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filters));
