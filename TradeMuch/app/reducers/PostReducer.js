import {
  RECEIVED_CREATE_POST,
} from '../actions/PostActions';

export function post(state = {}, action) {
  switch (action.type) {
    case RECEIVED_CREATE_POST:
      return {
        ...state,
        postFinish: action.data,
      };
    default:
      return state;
  }
}
