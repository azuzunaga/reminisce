import { merge, mapValues } from 'lodash';

import { FETCH_SAVE, FETCH_REVISION, FETCH_PROJECT } from '../actions/types';

export default (state = {}, action) => {
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
      return merge({}, state, action.revision);
    case FETCH_PROJECT:
      return merge({}, state, action.revisions);
    default:
      return state;
  }
};
