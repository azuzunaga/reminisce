import axios from 'axios';
import {
  FETCH_USER,
  OPEN_MODAL,
  CLOSE_MODAL,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  CREATE_PROJECT,
  FETCH_SAVE,
  FORM_ERROR,
  FETCH_DRAFT,
  CREATE_DRAFT,
  FETCH_REVISION,
  SET_DRAFTS,
  SET_ALL_CONFLICTS,
  UPDATE_CONFLICT_SELECTION,
} from './types';

export const fetchProjects = () => async dispatch => {
  const res = await axios.get('/api/projects')

  dispatch({ type: FETCH_PROJECTS, projects: res.data.projects, users: res.data.users });
};

export const fetchProject = id => async dispatch => {
  const res = await axios.get(`/api/projects/${id}`)

  dispatch({
    type: FETCH_PROJECT,
    project: res.data.project,
    drafts: res.data.drafts,
    saves: res.data.saves,
    revisions: res.data.revisions,
    users: res.data.users
  });
};

///////////////////////////////////////////////////////

export const fetchRevision = (projectId, revisionId) => async dispatch => {
  const res = await axios.get(`/api/projects/${projectId}/revisions/${revisionId}`);

  dispatch({
    type: FETCH_REVISION,
    revision: res.data.revision,
    project: res.data.project,
    draft: res.data.draft
  });
};

export const newRevision = () => {};

//////////////////////////////////////////////////////

export const fetchDraft = id => async dispatch => {
  const res = await axios.patch(`/api/drafts/${id}`);

  dispatch({
    type: FETCH_DRAFT,
    draft: res.data.draft,
    saves: res.data.saves,
    users: res.data.users,
    revisions: res.data.revisions
  });
};

export const createDraft = draft => async dispatch => {
  const res = await axios.post('/api/drafts', {
    draft
  }).then(function (res) {
    dispatch({
      type: CREATE_DRAFT,
      draft: res.data.draft,
      auth: res.data.auth
    });
  }).catch(function (res) {
    dispatch({
      type: FORM_ERROR,
      errors: res.response.data
    });
  });
};

///////////////////////////////////////////////////////

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

///////////////////////////////////////////////////////
export const openModal = modal => (
  {
    type: OPEN_MODAL,
    modal
  }
)

export const closeModal = () => (
  {
    type: CLOSE_MODAL
  }
)

export const setDrafts = drafts => (
  {
    type: SET_DRAFTS,
    drafts
  }
)

export const setAllConflicts = conflicts => (
  {
    type: SET_ALL_CONFLICTS,
    conflicts
  }
)

export const updateConflictSelection = conflict => (
  {
    type: UPDATE_CONFLICT_SELECTION,
    conflict
  }
)

export const fetchSave = id => async dispatch => {
  const res = await axios.get(`/api/saves/${id}`);

  dispatch({
    type: FETCH_SAVE,
    saves: res.data.saves,
    revisions: res.data.revisions
  });
};

export const createSave = (save) => async dispatch => {
  return await axios.post('/api/saves', save)
    .then(function (res) {
      dispatch({
        type: FETCH_SAVE,
        save: res.data.save,
        revisions: res.data.revisions
      })
    }).catch(function (res) {
      dispatch({
        type: FORM_ERROR,
        errors: res.response.data
      })
    }
  );
};

export const newProject = (project) => async dispatch => {
  return await axios.post('/api/projects', {
    project
  }).then(function(res) {
    dispatch({
      type: CREATE_PROJECT,
      project: res.data.project,
      draft: res.data.draft
    })
  }).catch(function(res) {
    dispatch({
      type: FORM_ERROR,
      errors: res.response.data
    })
  });
};

export const receiveErrors =(errors) => ({
  type: FORM_ERROR,
  errors
});
