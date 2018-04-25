import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import projectReducer from './projectReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  projects: projectReducer,
  users: usersReducer,
  ui: uiReducer
});
