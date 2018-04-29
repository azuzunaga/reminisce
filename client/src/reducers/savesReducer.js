import { merge } from 'lodash';

import { FETCH_SAVE, FETCH_DRAFT, FETCH_PROJECT, CREATE_SAVE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SAVE:
      return merge({}, state, {[action.save._id]: action.save});
    case FETCH_DRAFT:
      return merge({}, state, action.saves);
    case FETCH_PROJECT:
      return merge({}, action.saves);
    case CREATE_SAVE:
      return merge({}, state, {[action.save._id]: action.save});
    default:
      return state;
  }
};
