import HeadlinesCard from './HeadlinesCard.js';
import {styled} from '../../../styles';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    headlines: state.headlines
  }
);

export default styled()(connect(mapStateToProps)(HeadlinesCard));
