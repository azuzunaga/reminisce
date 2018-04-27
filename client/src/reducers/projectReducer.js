import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  CREATE_PROJECT,
  CREATE_DRAFT
} from '../actions/types';
import merge from 'lodash/merge';
export default function(state={}, action) {
  let project;
  switch (action.type) {
    case FETCH_PROJECTS:
      return merge({}, action.projects);
    case FETCH_PROJECT:
      return merge({}, state, {[action.project._id]: action.project});
    case CREATE_PROJECT:
      return merge({}, state, {[action.project._id]: action.project});
    case CREATE_DRAFT:
      project = merge({}, state[action.draft.projectId]);
      project.draftIds.push(action.draft._id);
      return merge({}, state, {[project._id]: project});
      break;
    default:
      return state;
  }
}
