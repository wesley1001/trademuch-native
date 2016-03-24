import {
  RECEIVED_CREATE_POST,
  RECEIVED_UPLOAD_IMG,
} from '../actions/PostActions';

export function post(state = {}, action) {
  switch (action.type) {
    case RECEIVED_CREATE_POST:
      return {
        ...state,
        postFinish: action.data,
      };
    case RECEIVED_UPLOAD_IMG:
      return {
        ...state,
        upLoadImg: action.data.src,
      };
    default:
      return state;
  }
}
