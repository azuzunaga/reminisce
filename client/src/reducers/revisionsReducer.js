import { merge, mapValues } from 'lodash';

import { FETCH_SAVE } from '../actions/types';

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
    default:
      return state;
  }
};
