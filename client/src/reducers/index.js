import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  auth: authReducer,
  projects: projectReducer,
  ui: uiReducer
});
