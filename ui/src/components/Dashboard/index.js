import Dashboard from './Dashboard';
import { selectTab, loadRegion } from '../../actions';
import { connect } from 'react-redux';
import {styled} from '../../styles';

const mapStateToProps = state => {
  if (state.data.length === 0 || state.region === null) {
    return { data: [] };
  }

  let {series, region, data, view } = state;

  return {
    data,
    contacts: {
      www: "covid19.jsoncampos.com",
      twitter: "@whatever"
    },
    view: {
      ...view,
      icons: {
        confirmed: { className: "fas fa-head-side-cough", color: "white" },
        deaths: { className: "fas fa-skull-crossbones", color: "red" }
      },
    },
    meta: {
      region: region.name,
      currentRegion: region,
      subregions: region.subregions.map(r => r.name),
      columns: series.columns
    },
  };
};

let mapDispatchToProps = dispatch => ({
  selectTab: (e,t) => dispatch(selectTab(t)),
  fetchRegion: selectedRegionId => dispatch(loadRegion(selectedRegionId))
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
