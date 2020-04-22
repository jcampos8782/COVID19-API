import {
  RECEIVE_FACTS,
  RECEIVE_DEMOGRAPHICS,
  RECEIVE_CONTACTS,
  RECEIVE_REGION,
  REQUEST_FACTS,
  REQUEST_DEMOGRAPHICS,
  REQUEST_CONTACTS
} from '../actions/types';

const defaultState = {
  loading: [],
  contacts: {},
  demographics: {},
  facts: {}
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case RECEIVE_CONTACTS:
          return {
            ...state,
            pending: state.loading.filter(s => s.type !== RECEIVE_CONTACTS),
            contacts: {...action.contacts}
          };
        case RECEIVE_DEMOGRAPHICS:
          return {
            ...state,
            pending: state.loading.filter(s => s.type !== RECEIVE_DEMOGRAPHICS),
            demographics: {...action.demographics}
          };
        case RECEIVE_FACTS:
          return {
            ...state,
            pending: state.loading.filter(s => s.type !== RECEIVE_FACTS),
            facts: {...action.facts}
          };
        case REQUEST_FACTS:
        case REQUEST_DEMOGRAPHICS:
        case REQUEST_CONTACTS:
          return {
            ...state,
            pending: state.loading.slice(0).push(action.type)
          };
        case RECEIVE_REGION:
          return {
            ...state,
            region: action.region
          };
        default:
            return state;
    }
}
