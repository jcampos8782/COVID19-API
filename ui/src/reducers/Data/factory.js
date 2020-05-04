import {
  RECEIVE_SERIES_DATA,
  REQUEST_SERIES_BY_REGION_ID
} from '../../actions/types';

export const createSeriesReducer = (seriesName, handler) => (
  (state = null, action) => {
    switch(action.type) {
      case RECEIVE_SERIES_DATA:
        if (action.series.name === seriesName) {
          return handler({...action});
        }
        return state;
      case REQUEST_SERIES_BY_REGION_ID:
        if (action.series.name === seriesName) {
          return null;
        }
        return state;
      default:
        return state
    }
  }
)
