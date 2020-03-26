import * as Actions from './types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const selectMunicipality = (municipalityId) => {
  return {
    type: Actions.SELECT_MUNICIPALITY,
    selectedMunicipalityId: municipalityId
  };
}

export const unselectMunicipality = () => {
    return { type: Actions.UNSELECT_MUNICIPALITY };
}

export const receiveMunicipalities = (regionId, municipalities) => {
    return {
        type: Actions.RECEIVE_MUNICIPALITIES,
        regionId,
        municipalities
    };
}

export const requestMunicipalities = (regionId) => {
  return { type: Actions.REQUEST_MUNICIPALITIES};
}

export const fetchMunicipalities = (regionId) => {
  return dispatch => {
    dispatch(requestMunicipalities(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}/municipalities`)
      .then(response => response.json(), error => console.log('Error!', error))
      .then(json => dispatch(receiveMunicipalities(regionId, json)));
  }
}
