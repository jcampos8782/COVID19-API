import Rt from './Rt';
import {connect} from 'react-redux';
import {styled} from '../../styles';
import {getSipOrderDate } from './selectors';
import {getRtData, getRtColumns} from '../../selectors';

import {
  getTheme
} from '../../selectors';

const mapStateToProps = state => ({
  data: getRtData(state),
  sipOrderDate: getSipOrderDate(state),
  theme: getTheme(state),
  columns: getRtColumns(state)
});

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Rt));
