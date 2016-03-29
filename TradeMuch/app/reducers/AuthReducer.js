import {
  // RECEIVED_USER_INFO,
  UPDATE_LOGIN_STATUS,
} from '../actions/AuthActions';

export function auth(state = { isLogin: false }, action) {
  switch (action.type) {
    // case RECEIVED_USER_INFO:
    //   return {
    //     ...state,
    //     userInfo: action.data,
    //   };
    case UPDATE_LOGIN_STATUS:
      return {
        isLogin: action.data,
      };
    default:
      return state;
  }
}
