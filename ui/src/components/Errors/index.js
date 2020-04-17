import Errors from './Errors.js';
import {styled} from '../../styles';
import {connect} from 'react-redux';
import {clearErrors} from '../../actions';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors())
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Errors));
