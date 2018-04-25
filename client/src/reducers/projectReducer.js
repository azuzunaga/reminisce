import { FETCH_PROJECTS } from '../actions/types';
import merge from 'lodash/merge';
export default function(state={}, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return merge({}, action.projects);
    default:
      return state;
  }
}
