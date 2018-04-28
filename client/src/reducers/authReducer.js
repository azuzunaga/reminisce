import {
  FETCH_USER,
  CREATE_PROJECT,
  CREATE_DRAFT,
  FETCH_DRAFT
} from '../actions/types';

export default function(state = null, action) {
  let newProjectsActiveDraft;
  switch (action.type) {
  case FETCH_USER:
    return action.payload || false;
  case CREATE_PROJECT:
    newProjectsActiveDraft = state.projectsActiveDraft.concat(
      [{ projectId: action.project._id, draftId: action.draft._id }]
    );
    return Object.assign({}, state, {projectsActiveDraft: newProjectsActiveDraft});
  case CREATE_DRAFT:
    return action.auth;
  case FETCH_DRAFT:
    return action.auth;
  default:
    return state;
  }
}
