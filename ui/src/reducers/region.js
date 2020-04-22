import {
  RECEIVE_FACTS,
  RECEIVE_DEMOGRAPHICS,
  RECEIVE_CONTACTS,
  RECEIVE_REGION,
  REQUEST_REGION
} from '../actions/types';

const defaultState = null

export default (state = defaultState, action) => {
    switch(action.type) {
        case RECEIVE_REGION:
          return {
            ...state,
            ...action.region
          }
        case RECEIVE_CONTACTS:
          return {
            ...state,
            contacts: {...action.contacts}
          };
        case RECEIVE_DEMOGRAPHICS:
          return {
            ...state,
            demographics: {...action.demographics}
          };
        case RECEIVE_FACTS:
          return {
            ...state,
            facts: {...action.facts}
          };
        case REQUEST_REGION:
          return null;
        default:
            return state;
    }
}
