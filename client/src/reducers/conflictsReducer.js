import { SET_ALL_CONFLICTS, UPDATE_CONFLICT_SELECTION } from '../actions/types';
import merge from 'lodash/merge';


export default function conflictsReducer(state = {}, action) {
  switch (action.type) {
    case SET_ALL_CONFLICTS:
      return action.conflicts;
    case UPDATE_CONFLICT_SELECTION:
      return merge({}, state, action.conflict)
    default:
      return state;
  }
}
