import DataPane from './DataPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';
import { getCovid19Data, getSeriesDataColumns, getRegion } from '../../../selectors';

const mapStateToProps = state => ({
  data: getCovid19Data(state),
  columns: getSeriesDataColumns(state),
  title: getRegion(state) ? getRegion(state).name : null
})

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(DataPane));
