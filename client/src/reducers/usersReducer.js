import { FETCH_PROJECTS, FETCH_DRAFT } from '../actions/types';
import merge from 'lodash/merge';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return merge({}, state, action.users);
    case FETCH_DRAFT:
      return merge({}, state, action.users)
    default:
      return state;
  }
}
