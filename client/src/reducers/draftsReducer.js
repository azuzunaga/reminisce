import { merge } from 'lodash';

import { FETCH_PROJECT, FETCH_SAVE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return merge({}, state, action.drafts);
    case FETCH_SAVE:
      let newState = Object.assign({}, state);
      let draft = newState[action.save.draftId];
      newState[draft._id] = merge({}, draft,
        {saveIds: draft.saveIds.concat([action.save._id])});
      return newState;
    default:
      return state;
  }
};
