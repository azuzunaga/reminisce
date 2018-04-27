import { SET_DRAFTS } from '../actions/types';

export default function draftSelectionReducer(state = {}, action) {
  switch (action.type) {
    case SET_DRAFTS:
      return action.drafts;
    default:
      return state;
  }
}
