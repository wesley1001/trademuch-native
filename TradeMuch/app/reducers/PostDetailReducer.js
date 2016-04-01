import {
  RECEIVED_DELETE_FAVORITE_ITEM,
  RECEIVED_ADD_FAVORITE_ITEM,
} from '../actions/PostDetailActions';

export function postDetail(state = {}, action) {
  switch (action.type) {
    case RECEIVED_DELETE_FAVORITE_ITEM:
      return {
        ...state,
        isFav: !action.data.result,
      };
    case RECEIVED_ADD_FAVORITE_ITEM:
      return {
        ...state,
        isFav: action.data.result,
      };

    default:
      return state;
  }
}
