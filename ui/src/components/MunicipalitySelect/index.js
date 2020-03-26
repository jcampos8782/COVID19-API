import MunicipalitySelect from './MunicipalitySelect';

import { connect } from 'react-redux';

import {
  selectMunicipality,
  unselectMunicipality,
  fetchCasesByMunicipality,
  fetchCasesByRegion
} from '../../actions';

const mapStateToProps = state => ({
  options: state.municipalities,
  ...state.municipalitiesFilter
 });

const mapDispatchToProps = (dispatch) => ({
    selectMunicipality: (id, regionId) => {
      if(id === "-1") {
        dispatch(unselectMunicipality());
        dispatch(fetchCasesByRegion(regionId));
        return;
      }

      dispatch(fetchCasesByMunicipality(id));
      dispatch(selectMunicipality(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalitySelect);
