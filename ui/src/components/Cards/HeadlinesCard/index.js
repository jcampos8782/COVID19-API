import HeadlinesCard from './HeadlinesCard.js';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

import { changeHeadlinesPage, changeHeadlinesRowsPerPage } from '../../../actions';

const mapStateToProps = state => (
  {
    headlines: state.headlines
  }
);

const mapDispatchToProps = dispatch => (
  {
    changePage: (e,page) => dispatch(changeHeadlinesPage(page)),
    changeRowsPerPage: (e,rows) => dispatch(changeHeadlinesRowsPerPage(rows))
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(HeadlinesCard));
