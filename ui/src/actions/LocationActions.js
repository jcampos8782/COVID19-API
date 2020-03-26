import * as Actions from './types';
import { selectRegion } from './RegionActions';
import { fetchCasesByRegion, fetchCasesByMunicipality } from './CaseActions';
import { selectMunicipality, fetchMunicipalities } from './MunicipalityActions';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const requestGeocoding = () => {
  return { type: Actions.REQUEST_GEOCODING };
}

export const receiveGeocoding = (components) => {
    return { type: Actions.RECEIVE_GEOCODING, components };
}

export const requestGeolocation = () => {
    return { type: Actions.REQUEST_GEOLOCATION };
}

export const receiveGeolocation = (coords) => {
    return { type: Actions.RECEIVE_GEOLOCATION, coords };
}

export const fetchGeolocation = () => {
    return dispatch => {
      dispatch(requestGeolocation());

      navigator.geolocation.getCurrentPosition((pos) => {
        dispatch(receiveGeolocation(pos.coords));
        dispatch(fetchGeocoding(pos.coords));
      });
    }
}

export const fetchGeocoding = (coords) => {
    return (dispatch, getState) => {
        dispatch(requestGeocoding());
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&sensor=false&key=${GOOGLE_API_KEY}`)
            .then(response => response.json())
            .then(json => {
              dispatch(receiveGeocoding(json.results));
              let region = getState().geolocation.region;
              let matchingRegion = getState().regions.find(r => r.name === region.long_name || r.name === region.short_name);

              if (matchingRegion) {
                dispatch(selectRegion(matchingRegion.id));
                // Attempt to fetch the municipalities for the region.
                return dispatch(fetchMunicipalities(matchingRegion.id));
              }
            })
            .then(result => {
              if (!result) {
                return;
              }

              // Attempt to match the municipality to the user's municipality
              let municipality = getState().geolocation.municipality;
              let matchingMunicipality = getState().municipalities.find(m => m.name === municipality.long_name || m.name === municipality.short_name);

              if (matchingMunicipality) {
                dispatch(selectMunicipality(matchingMunicipality.id));
                dispatch(fetchCasesByMunicipality(matchingMunicipality.id));
              } else {
                dispatch(fetchCasesByRegion(result.regionId));
              }
            });
    }
}
