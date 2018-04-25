import { merge } from 'lodash';

import { FETCH_SAVE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SAVE:
      return merge({}, state, action.revisions);
    default:
      return state;
  }
};
