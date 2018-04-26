import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import projectReducer from './projectReducer';
import usersReducer from './usersReducer';
import savesReducer from './savesReducer';
import revisionsReducer from './revisionsReducer';
import errorsReducer from './errorsReducer';
import draftsReducer from './draftsReducer';

export default combineReducers({
  auth: authReducer,
  projects: projectReducer,
  users: usersReducer,
  ui: uiReducer,
  saves: savesReducer,
  revisions: revisionsReducer,
  errors: errorsReducer,
  drafts: draftsReducer
});
