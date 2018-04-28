import { merge } from 'lodash';

import {
  FETCH_PROJECT,
  CREATE_DRAFT,
  FETCH_SAVE,
  CREATE_PROJECT,
  FETCH_REVISION,
  CREATE_SAVE
} from '../actions/types';

export default (state = {}, action) => {
  let draft;
  let newState;
  switch (action.type) {
  case FETCH_REVISION:
    return merge({}. state, { [action.draft._id]: action.draft });
  case FETCH_PROJECT:
    return merge({}, state, action.drafts);
  case CREATE_PROJECT:
    draft = { [action.draft._id]: action.draft };
    return merge({}, state, draft);
  case CREATE_DRAFT:
     draft = { [action.draft._id]: action.draft };
     return merge({}, state, draft);
   case CREATE_SAVE:
     let newState = Object.assign({}, state);
     let draft = newState[action.draftId];
     newState[draft._id] = merge({}, draft,
       {saveIds: draft.saveIds.concat([action.save._id])});
     return newState;
  case FETCH_SAVE:
    newState = Object.assign({}, state);
    draft = newState[action.draftId];
    newState[draft._id] = merge({}, draft,
      {saveIds: draft.saveIds.concat([action.save._id])});
    return newState;
  default:
    return state;
  }
};
