import { FORM_ERROR } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case FORM_ERROR:
      return action.errors;
    default:
      return state;
  }
}
