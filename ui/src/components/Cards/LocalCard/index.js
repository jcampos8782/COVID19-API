import {connect} from 'react-redux';

import LocalCard from './LocalCard.js';
import {styled} from '../../../styles';

import {fetchDemographics, fetchFacts, fetchContacts} from '../../../actions';

const mapStateToProps = state => ({
  region: state.regions.current,
  contacts: state.facts.contacts,
  demographics: state.facts.demographics,
  facts: state.facts.facts
})

const mapDispatchToProps = dispatch => ({
    fetchData: regionId => {
      dispatch(fetchFacts(regionId));
      dispatch(fetchContacts(regionId));
      dispatch(fetchDemographics(regionId));
    }
})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(LocalCard));
