import * as Actions from './types';
import { selectRegion, setFilterOptions } from './FilterActions';
import { fetchRegion, fetchSubregions, fetchClosestRegion } from './RegionActions';

const DEFAULT_LOCATION = "United States";

export const setDefaultLocation = name => ({type: Actions.SET_DEFAULT_LOCATION, name})
export const geolocationError = error => ({ type: Actions.ERROR_GEOLOCATION, error})

export const requestGeolocation = () => ({ type: Actions.REQUEST_GEOLOCATION })
export const receiveGeolocation = coords => ({  type: Actions.RECEIVE_GEOLOCATION, coords })

export const fetchGeolocation = () => {
  return (dispatch, getState) => {
    dispatch(requestGeolocation());

    if (!navigator.geolocation) {
      dispatch(geolocationError("Geolocation unavailable"));
      return;
    }

    return new Promise((resolve,reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          let {coords} = pos;
          Promise.all([
            dispatch(receiveGeolocation(coords)),
            dispatch(fetchClosestRegion(coords.latitude, coords.longitude))
          ])
          .then(results => {
            let regionAction = results.find(r => r.type === Actions.RECEIVE_REGION);
            let region = regionAction.region;
            let index = region.parents.length;
            // Load subregions for all parents
            Promise.all(region.parents.map(parent => dispatch(fetchSubregions(parent.id))))
            .then(actions => {
              actions.forEach(action => {
                let filterIndex = region.parents.findIndex(p => p.id === action.regionId);
                dispatch(setFilterOptions(index - filterIndex, action.subregions.map(o => ({id: o.id, name: o.name}))))
              });
            })
            .then(results => {
              region.parents.forEach((p,idx) => {
                dispatch(selectRegion(index - idx - 1, p.id))
              });
              dispatch(selectRegion(index, region.id));
              resolve();
            });
          })
          .catch(error => dispatch(geolocationError(error)));
        },
        err => {
          dispatch(geolocationError(err));

          // Load a default region if possible.
          const { regions } = getState();
          const region = regions.all.find(r => r.name === DEFAULT_LOCATION);
          if (region) {
            Promise.all([
              dispatch(selectRegion(region.id, 0)),
              dispatch(fetchRegion(region.id))
            ])
            .then(resolve)
            .catch(error => dispatch(geolocationError(error)));
          } else {
            reject();
          }
        }
      )
    },
    {timeout: 3000});
  }
}
