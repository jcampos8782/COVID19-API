import { ERROR_LOADING, CLEAR_ERRORS } from '../actions/types';

export default (state = [], action ) => {
  switch (action.type) {
    case ERROR_LOADING:
      const {error} = action;
      const errors = state.slice(0);

      // Log the new error and then append to set of existing
      errors.push(error.message || "An unexpected error occurred");
      return errors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
}
