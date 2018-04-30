import { merge } from 'lodash';

import { FETCH_MERGE, SET_ALL_CONFLICTS } from '../actions/types';

export default function mergeReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_MERGE:
      return action.data;
    case SET_ALL_CONFLICTS:
      return merge({}, state, {
        revisions: action.revisions,
        chunkedMerges: action.chunkedMerges
      });
    default:
      return state;
  }
}
