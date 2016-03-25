import {
  RECEIVED_MESSAGES,
} from '../actions/MessageActions';

export function messenger(state = {}, action) {
  switch (action.type) {
    case RECEIVED_MESSAGES:
      return {
        ...state,
        messages: action.data,
      };
    default:
      return state;
  }
}
