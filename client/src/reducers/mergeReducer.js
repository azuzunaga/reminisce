import { FETCH_MERGE } from '../actions/types';

export default function mergeReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_MERGE:
      return action.data;
    default:
      return state;
  }
}
