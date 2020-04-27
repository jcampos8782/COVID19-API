import SummaryPane from './SummaryPane';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(SummaryPane));
