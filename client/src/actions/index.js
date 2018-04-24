import axios from 'axios';
import {
  FETCH_USER,
  OPEN_MODAL,
  CLOSE_MODAL
} from './types';

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
