import TestingResults from './TestingResults';
import {connect} from 'react-redux';
import {styled} from '../../styles';

const mapStateToProps = state => {
  const {region: {facts: {tests}}} = state;
  return {
    data: tests && Object.keys(tests).reduce((obj,key) => {
      if (tests[key]) {
        obj[key] = tests[key];
      }
      return obj;
    }, {})
  }
};

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(TestingResults));
