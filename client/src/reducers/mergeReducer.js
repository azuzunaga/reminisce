import { merge } from 'lodash';

import {
  FETCH_MERGE,
  SET_ALL_CONFLICTS,
  MERGE_LOADING
} from '../actions/types';

export default function mergeReducer(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_MERGE:
      return merge({}, action.data, { loading: false });
    case SET_ALL_CONFLICTS:
      return merge({}, state, {
        revisions: action.revisions,
        chunkedMerges: action.chunkedMerges,
        loading: false
      });
    case MERGE_LOADING:
      return merge({}, state, { loading: true });
    default:
      return state;
  }
}
