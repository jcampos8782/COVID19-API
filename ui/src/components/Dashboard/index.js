import { connect } from 'react-redux';

import Dashboard from './Dashboard';

import { styled } from '../../styles';
import { selectTab, loadRegion } from '../../actions';
import { getData, getCurrentTab, getRegion} from '../../selectors';

const mapStateToProps = state => ({
  data: getData(state),
  tab: getCurrentTab(state),
  region: getRegion(state)
});

let mapDispatchToProps = dispatch => ({
  selectTab: (e,t) => dispatch(selectTab(t)),
  fetchRegion: selectedRegionId => dispatch(loadRegion(selectedRegionId)),
  refresh: currentRegionId => dispatch(loadRegion(currentRegionId))
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
