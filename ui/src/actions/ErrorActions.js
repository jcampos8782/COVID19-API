import * as Actions from './types';
export const error = e => ({type: Actions.ERROR_LOADING, error: e })
export const clearErrors = () => ({type: Actions.CLEAR_ERRORS });
