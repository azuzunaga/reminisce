import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  CREATE_PROJECT,
  FETCH_REVISION,
  CREATE_DRAFT,
  DELETE_PROJECT
} from '../actions/types';
import merge from 'lodash/merge';
import pickBy from 'lodash/pickBy';
export default function(state={}, action) {
  let project;
  switch (action.type) {
    case FETCH_REVISION:
      return merge({}, state, {[action.project._id]: action.project});
    case FETCH_PROJECTS:
      return merge({}, action.projects);
    case FETCH_PROJECT:
      return merge({}, state, {[action.project._id]: action.project});
    case CREATE_PROJECT:
      return merge({}, state, {[action.project._id]: action.project});
    case DELETE_PROJECT:
      return pickBy(state, p => p._id !== action.project._id);
    case CREATE_DRAFT:
      project = merge({}, state[action.draft.projectId]);
      project.draftIds.push(action.draft._id);
      return merge({}, state, {[project._id]: project});
    default:
      return state;
  }
}
