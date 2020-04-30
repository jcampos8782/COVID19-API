import DataPane from './DataPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';
import { getData, getSeriesDataColumns, getRegion } from '../../../selectors';

const mapStateToProps = state => ({
  data: getData(state),
  columns: getSeriesDataColumns(state),
  title: getRegion(state) ? getRegion(state).name : null
})

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(DataPane));
