import { RECEIVE_GEOLOCATION, RECEIVE_GEOCODING, ERROR_GEOLOCATION } from '../actions/types';

export default (state = {enabled: true}, action) => {
    switch(action.type) {
        case ERROR_GEOLOCATION:
            return {
              ...state,
              enabled: false
            } ;
        case RECEIVE_GEOLOCATION:
            return {
                ...state,
                coords: {
                    latitude: action.coords.latitude,
                    longitude: action.coords.longitude
                }
            };
        case RECEIVE_GEOCODING:
            let localeElement = action.components.filter(c => c.types.find(t => t === 'locality'));
            let municipalityElement = action.components.filter(c => c.types.find(t => t === 'administrative_area_level_1'));
            let regionElement = action.components.filter(c => c.types.find(t => t === 'country'));
            let location = {};

            if (localeElement) {
                let locale = localeElement[0].address_components[0];
                location.locale = {
                    long_name: locale.long_name,
                    short_name: locale.short_name
                };
            }

            if (municipalityElement) {
                let municipality = municipalityElement[0].address_components[0];
                location.municipality = {
                    long_name: municipality.long_name,
                    short_name: municipality.short_name
                };
            }

            if (regionElement) {
                let region = regionElement[0].address_components[0];
                location.region = {
                    long_name: region.long_name,
                    short_name: region.short_name
                };
            }

            return {
                ...state,
                ...location
            };
        default:
            return state;
    }
}
