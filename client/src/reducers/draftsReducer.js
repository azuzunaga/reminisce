import { merge } from 'lodash';

import { FETCH_PROJECT } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return merge({}, state, action.drafts);
    default:
      return state;
  }
};
