import {
  fetchWithAuth,
} from '../utils/authFetch';
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVED_USER_INFO = 'RECEIVED_USER_INFO';

function receivedUserInfo(userInfo) {
  return {
    type: RECEIVED_USER_INFO,
    data: userInfo,
  };
}

export async function requestUserInfo(userIdentities) {
  const fbGraphApi = `https://graph.facebook.com/v2.5/${userIdentities.userID}?fields=id,name,email&access_token=${userIdentities.tokenString}`;
  let userInfo = await fetch(fbGraphApi);
  userInfo = await userInfo.json();
  return (dispatch) => {
    dispatch(receivedUserInfo(userInfo));
  };
}


export async function updateUserInfo(data = {
  email: '123123@gmail.com',
  location: {
    latitude: 10,
    longitude: -10,
  },
}) {
  const updateEmail = 'http://localhost:1337/rest/user';
  const response = await fetchWithAuth(updateEmail, 'PUT', data);
  const responseJson = await response.json();
  return (dispatch) => {
    dispatch(receivedUserInfo(responseJson));
  };
}
