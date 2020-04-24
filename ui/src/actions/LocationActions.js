import * as Actions from './types';

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
          dispatch(receiveGeolocation(coords));
          resolve(coords);
        },
        err => {
          dispatch(geolocationError(err));
          reject(err);
        },
        {timeout: 5000}
      )
    });
  }
}
