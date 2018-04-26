import axios from 'axios';
import {
  FETCH_USER,
  OPEN_MODAL,
  CLOSE_MODAL,
  FETCH_PROJECTS,
  FETCH_SAVE,
  FETCH_PROJECT,
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
    drafts: res.data.drafts
  });
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')

  dispatch({ type: FETCH_USER, payload: res.data });
};

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


export const fetchSave = id => async dispatch => {
  const res = await axios.get(`/api/saves/${id}`);

  dispatch({
    type: FETCH_SAVE,
    saves: res.data.saves,
    revisions: res.data.revisions
  });
}

export const newProject = (project) => async dispatch => {
  const res = await axios.post('/api/projects', {
    project
  });

  dispatch({
    type: FETCH_PROJECT,
    project: res.data.project
  })
};

export const newRevision = () => {};
