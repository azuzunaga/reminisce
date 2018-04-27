import { merge, mapValues } from 'lodash';

import {
  FETCH_SAVE,
  FETCH_REVISION,
  FETCH_PROJECT,
  FETCH_DRAFT
} from '../actions/types';

export default (state = {}, action) => {
  let fetchedRev;
  switch (action.type) {
  case FETCH_SAVE:
    return merge(
      {},
      state,
      mapValues(action.revisions, rev =>
        merge({ body: { entityMap: {} } }, rev)
      )
    );
  case FETCH_REVISION:
    fetchedRev = { [action.revision._id]: action.revision };
    return merge({}, state, fetchedRev);
  case FETCH_PROJECT:
    return merge({}, state, action.revisions);
  case FETCH_DRAFT:
    return merge({}, state, action.revisions);
  default:
    return state;
  }
};
