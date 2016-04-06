import {
  RECEIVED_SEARCH_POST,
  RECEIVED_SEARCH_POST_NEXT,
  RECEIVED_SAVE_SEARCH_API,
  RECEIVED_SEARCH_LOAD_MORE,
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
    case RECEIVED_SAVE_SEARCH_API:
      return {
        ...state,
        lastSeachApi: action.data,
      };
    case RECEIVED_SEARCH_LOAD_MORE:
      return {
        ...state,
        canLoadMore: action.data,
      };
    default:
      return state;
  }
}
