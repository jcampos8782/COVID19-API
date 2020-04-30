import HeadlinesCard from './HeadlinesCard.js';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

import { getHeadlines } from '../../../selectors';

import {
  fetchHeadlines,
  changeHeadlinesPage,
  changeHeadlinesRowsPerPage
} from '../../../actions';

const mapStateToProps = state => (
  {
    headlines: getHeadlines(state)
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchHeadlines: query => dispatch(fetchHeadlines(query)),
    changePage: (e,page) => dispatch(changeHeadlinesPage(page)),
    changeRowsPerPage: (e,rows) => dispatch(changeHeadlinesRowsPerPage(rows))
  }
)

export default styled()(connect(mapStateToProps, mapDispatchToProps)(HeadlinesCard));
