import {
  RECEIVE_FACTS,
  RECEIVE_DEMOGRAPHICS,
  RECEIVE_CONTACTS
} from '../actions/types';

export default (state = {contacts: {}, demographics: {}, facts: {}}, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
}
