import { combineReducers } from 'redux';
import covid19 from './covid19'
import rt from  './rt';

export default combineReducers({covid19, rt})
