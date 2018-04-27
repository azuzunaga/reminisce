import { FETCH_USER, CREATE_PROJECT } from '../actions/types';

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
  default:
    return state;
  }
}
