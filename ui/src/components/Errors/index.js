import Errors from './Errors.js';
import {styled} from '../../styles';
import {connect} from 'react-redux';
import {clearErrors} from '../../actions';
import {getErrors} from '../../selectors';

const mapStateToProps = state => ({
  errors: getErrors(state)
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors())
});

export default styled()(connect(mapStateToProps, mapDispatchToProps)(Errors));
