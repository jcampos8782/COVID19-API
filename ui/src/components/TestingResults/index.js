import TestingResults from './TestingResults';
import {connect} from 'react-redux';
import {styled} from '../../styles';

const mapStateToProps = state => {
  const {region} = state;
  if (!region) {
    return { loading: true }
  }
  
  const {region: {facts: {tests}}, view} = state;

  return {
    theme: view.theme,
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
