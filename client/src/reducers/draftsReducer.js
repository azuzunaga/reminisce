import { merge } from 'lodash';

import {
  FETCH_PROJECT,
  CREATE_DRAFT,
} from '../actions/types';

export default (state = {}, action) => {
  let newDraft;
  switch (action.type) {
  case FETCH_PROJECT:
    return merge({}, state, action.drafts);
  case CREATE_DRAFT:
    newDraft = { [action.draft.id]: action.draft };
    return merge({}, state, newDraft);
  default:
    return state;
  }
};
