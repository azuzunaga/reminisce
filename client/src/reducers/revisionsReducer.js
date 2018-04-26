import { merge, mapValues } from 'lodash';

import { FETCH_SAVE, FETCH_REVISION } from '../actions/types';

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
    default:
      return state;
  }
};
