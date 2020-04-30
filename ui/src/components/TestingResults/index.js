import TestingResults from './TestingResults';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {styled} from '../../styles';
import {getFacts, getTheme} from '../../selectors';

const extractTestData = createSelector(
  getFacts,
  tests => tests && Object.keys(tests).reduce((obj,key) => {
    if (tests[key]) {
      obj[key] = tests[key];
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
