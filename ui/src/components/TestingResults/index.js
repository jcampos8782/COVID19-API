import TestingResults from './TestingResults';
import {connect} from 'react-redux';
import {styled} from '../../styles';
import {createSelector} from 'reselect';

const extractTestData = createSelector(
  [state => state.region.facts.tests],
  tests => tests && Object.keys(tests).reduce((obj,key) => {
    if (tests[key]) {
      obj[key] = tests[key];
    }
    return obj;
  }, {})
);

const mapStateToProps = state => {
  const {region} = state;
  if (!region) {
    return { loading: true }
  }

  const {view} = state;

  return {
    theme: view.theme,
    data: extractTestData(state)
  }
};

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(TestingResults));
