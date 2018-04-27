import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  CREATE_PROJECT
} from '../actions/types';
import merge from 'lodash/merge';
export default function(state={}, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return merge({}, action.projects);
    case FETCH_PROJECT:
      return merge({}, state, {[action.project._id]: action.project});
    case CREATE_PROJECT:
    return merge({}, state, {[action.project._id]: action.project});
    default:
      return state;
  }
}
