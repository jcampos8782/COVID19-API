import {connect} from 'react-redux';

import LocalCard from './LocalCard.js';
import {styled} from '../../../styles';

import {fetchDemographics, fetchFacts, fetchContacts} from '../../../actions';

const mapStateToProps = state => {
  // Find data for the region if one is set.
  let confirmed = null;
  if (!state.region) {
    return { loading: true }
  }

  let regionData = state.data.find(d => d.regions[0] === state.region.id);
  let confirmedData = regionData ? regionData.data.confirmed : null;
  confirmed = confirmedData ? confirmedData[confirmedData.length - 1] : null

  return {
    region: state.region,
    contacts: state.region.contacts,
    demographics: state.region.demographics,
    facts: {
      recovered: state.region.facts.recovered,
      confirmed: confirmed,
      tests: state.region.facts.tests
    },
    hospitalizations: state.region.facts.hospitalizations ? state.region.facts.hospitalizations.current : null
  }
}

const mapDispatchToProps = dispatch => ({
    fetchData: regionId => {
      dispatch(fetchFacts(regionId));
      dispatch(fetchContacts(regionId));
      dispatch(fetchDemographics(regionId));
    }
})

export default styled()(connect(mapStateToProps,mapDispatchToProps)(LocalCard));
