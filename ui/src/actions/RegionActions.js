import * as Actions from './types';
import { error } from './ErrorActions';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requestRegion = id => ({ type: Actions.REQUEST_REGION, id })
export const receiveRegion = region => ({ type: Actions.RECEIVE_REGION, region })

export const requestRegions = level => ({ type: Actions.REQUEST_REGIONS, level })
export const receiveRegions = (level, regions) => ({ type: Actions.RECEIVE_REGIONS, level, regions })

export const requestSubregions = () => ({ type: Actions.REQUEST_SUBREGIONS })
export const receiveSubregions = (regionId, subregions) => ({ type: Actions.RECEIVE_SUBREGIONS, regionId, subregions })

export const requestRegionByGeoCoords = (lat,lon) =>  ({ type: Actions.REQUEST_REGION_BY_GEOLOCATION, lat, lon })
export const receiveRegionByGeoCoords = region =>  ({ type: Actions.RECEIVE_REGION, region })

export const requestFacts = regionId => ({type: Actions.REQUEST_FACTS, regionId})
export const receiveFacts = facts => ({type: Actions.RECEIVE_FACTS, facts})

export const requestDemographics = regionId => ({type: Actions.REQUEST_DEMOGRAPHICS, regionId})
export const receiveDemographics = demographics => ({type: Actions.RECEIVE_DEMOGRAPHICS, demographics})

export const requestContacts = regionId => ({type: Actions.REQUEST_CONTACTS, regionId})
export const receiveContacts = contacts => ({type: Actions.RECEIVE_CONTACTS, contacts})

export const selectRegion = region => ({type: Actions.SELECT_REGION, region })

export const loadRegion = regionId => {
  return dispatch => {
      return dispatch(fetchRegion(regionId))
        .then(
          region => {
            dispatch(selectRegion(region))
            return region;
          },
          e => dispatch(error(e)))
        .catch(e => dispatch(error(e)));
  }
}

export const fetchClosestRegion = (lat,lon) => {
  return (dispatch,getState) => {
    dispatch(requestRegionByGeoCoords(lat,lon));
    return _fetchRegion(dispatch, `${SERVER_URL}/api/regions/geo?lat=${lat}&lon=${lon}`)
  }
}

export const fetchDefaultRegion = (allRegions, regionName) => {
    return (dispatch, getState) => {
      let defaultRegion = allRegions.find(r => r.name === regionName);
      if (defaultRegion) {
        return _fetchRegion(dispatch, `${SERVER_URL}/api/regions/${defaultRegion.id}`);
      } else {
        dispatch(error( new Error(`Could not locate default region "${regionName}"`)));
      }
    }
}

export const fetchSubregions = regionId => {
    return dispatch => {
      dispatch(requestSubregions(regionId));
      return fetch(`${SERVER_URL}/api/regions/${regionId}/subregions`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve subregions")})
        .then(json => {
          dispatch(receiveSubregions(regionId, json));
          return {
            id: regionId,
            subregions: json
          }
        })
        .catch(e => dispatch(error(e)));
    }
}

export const fetchRegions = level => {
    return dispatch => {
        dispatch(requestRegions(level));
        return fetch(`${SERVER_URL}/api/regions`)
            .then(response => response.json(), e => { throw new Error("Failed to retrieve regions")})
            .then(json => {
              dispatch(receiveRegions(level, json))
              return json;
            })
            .catch(e => dispatch(error(e)));
    }
}

const fetchRegion = regionId => {
  return (dispatch,getState) => {
    dispatch(requestRegion(regionId));
    return _fetchRegion(dispatch, `${SERVER_URL}/api/regions/${regionId}`)
  }
}

const fetchFacts = regionId => {
  return dispatch => {
    dispatch(requestFacts(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}/facts`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve facts")})
        .then(json => {
          dispatch(receiveFacts(json))
          return json;
        })
        .catch(e => dispatch(error(e)));;
  }
}

const fetchDemographics = regionId => {
  return dispatch => {
    dispatch(requestDemographics(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}/demographics`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve facts")})
        .then(json => {
          dispatch(receiveDemographics(json))
          return json;
        })
        .catch(e => dispatch(error(e)));;
  }
}

const fetchContacts = regionId => {
  return dispatch => {
    dispatch(requestContacts(regionId));
    return fetch(`${SERVER_URL}/api/regions/${regionId}/contacts`)
        .then(response => response.json(), e => { throw new Error("Failed to retrieve facts")})
        .then(json => {
          dispatch(receiveContacts(json))
          return json;
        })
        .catch(e => dispatch(error(e)));;
  }
}

const _fetchRegion = (dispatch, url) => {
  return fetch(url)
    .then(response => response.json(), e => { throw new Error("Failed to retrieve region")})
    .then(region => (
      Promise.all([
        dispatch(fetchDemographics(region.id)),
        dispatch(fetchFacts(region.id)),
        dispatch(fetchContacts(region.id)),
        region.parents.map(p => dispatch(fetchContacts(p.id)))
      ].flat())
      .then(results => {
        // Parent contacts come back in results [3...]
        for(let i = 3; i < results.length; i++) {
          region.parents[i - 3] = {
            ...region.parents[i-3],
            contacts: results[i]
          };
        };

        region = {
          ...region,
          demographics: results[0],
          facts: results[1],
          contacts: results[2]
        }
        dispatch(receiveRegion(region));
        return region;
      })
    ))
    .catch(e => dispatch(error(e)));
}
