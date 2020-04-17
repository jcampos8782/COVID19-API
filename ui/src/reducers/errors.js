import { ERROR_LOADING, CLEAR_ERRORS } from '../actions/types';

export default (state = [], action ) => {
  switch (action.type) {
    case ERROR_LOADING:
      let errors = state.slice(0);
      errors.push(action.error);
      return errors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
}
