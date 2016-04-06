import {
  RECEIVED_SEARCH_POST,
  RECEIVED_SEARCH_POST_NEXT,
} from '../actions/SearchPostActions';

export function search(state = {}, action) {
  switch (action.type) {
    case RECEIVED_SEARCH_POST:
      return {
        ...state,
        postList: action.data,
      };
    case RECEIVED_SEARCH_POST_NEXT:
      return {
        ...state,
        postList: state.postList.concat(action.data),
      };
    default:
      return state;
  }
}
