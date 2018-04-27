import axios from 'axios';
import {
  FETCH_USER,
  OPEN_MODAL,
  CLOSE_MODAL,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  FETCH_SAVE,
  FORM_ERROR,
  FETCH_SAVES,
  FETCH_DRAFT,
  CREATE_DRAFT,
  FETCH_REVISION
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

export const newProject = (project) => async dispatch => {
  const res = await axios.post('/api/projects', {
    project
  }).then(function(res) {
    dispatch({
      type: FETCH_PROJECT,
      project: res.data.project
    });
  }).catch(function(res) {
    dispatch({
      type: FORM_ERROR,
      errors: res.response.data
    });
  });
};
///////////////////////////////////////////////////////

export const fetchRevision = id => async dispatch => {
  const res = await axios.get(`/api/revision/${id}`);

  dispatch({
    type: FETCH_REVISION,
    revision: res.data.revision
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
    currentRevisions: res.data.currentRevisions
  });
};

export const createDraft = draft => async dispatch => {
  const res = await axios.post('/api/drafts', {
    draft
  }).then(function (res) {
    dispatch({
      type: CREATE_DRAFT,
      draft: draft
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

export const fetchSave = id => async dispatch => {
  const res = await axios.get(`/api/saves/${id}`);

  dispatch({
    type: FETCH_SAVE,
    saves: res.data.saves,
    revisions: res.data.revisions
  });
};

export const createSave = (save) => async dispatch => {
  const res = await axios.post('/api/saves', {
    save
  }).then(function (res) {
    dispatch({
      type: FETCH_SAVE,
      saves: res.data.save
    });
  }).catch(function (res) {
    dispatch({
      type: FORM_ERROR,
      errors: res.response.data
    });
  });
};
///////////////////////////////////////////////////////
export const receiveErrors =(errors) => ({
  type: FORM_ERROR,
  errors
});
///////////////////////////////////////////////////////
export const openModal = modal => (
  {
    type: OPEN_MODAL,
    modal
  }
);

export const closeModal = () => (
  {
    type: CLOSE_MODAL
  }
);
