import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import draftSelectionReducer from './draftSelectionReducer';
import conflictsReducer from  './conflictsReducer';

export default combineReducers({
  modal: modalReducer,
  selectedDrafts: draftSelectionReducer,
  conflicts: conflictsReducer
});
