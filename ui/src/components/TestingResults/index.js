import TestingResults from './TestingResults';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {styled} from '../../styles';
import {getFacts, getTheme} from '../../selectors';

const extractTestData = createSelector(
  getFacts,
  facts => facts && facts.tests && Object.keys(facts.tests).reduce((obj,key) => {
    if (facts.tests[key]) {
      obj[key] = facts.tests[key];
    }
    return obj;
  }, {})
);

const mapStateToProps = state => ({
  theme: getTheme(state),
  data: extractTestData(state)
});

const mapDispatchToProps = dispatch => ({})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(TestingResults));
