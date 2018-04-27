import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import draftSelectionReducer from './draftSelectionReducer';

export default combineReducers({
  modal: modalReducer,
  selectedDrafts: draftSelectionReducer,
});
