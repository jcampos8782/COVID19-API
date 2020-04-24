import Dashboard from './Dashboard';
import { selectTab, loadRegion } from '../../actions';
import { connect } from 'react-redux';
import {styled} from '../../styles';

const mapStateToProps = state => {
  let {region, data, view } = state;
  return {
    data,
    view,
    region
  };
};

let mapDispatchToProps = dispatch => ({
  selectTab: (e,t) => dispatch(selectTab(t)),
  fetchRegion: selectedRegionId => dispatch(loadRegion(selectedRegionId))
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
