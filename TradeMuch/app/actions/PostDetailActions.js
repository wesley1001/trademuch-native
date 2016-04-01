import {
  fetchWithAuth,
} from '../utils/authFetch';
import { Alert, Linking, } from 'react-native';
// import { Linking } from 'react-native';
export const RECEIVED_ADD_FAVORITE_ITEM = 'RECEIVED_ADD_FAVORITE_ITEM';
export const RECEIVED_DELETE_FAVORITE_ITEM = 'RECEIVED_DELETE_FAVORITE_ITEM';

function receivedAddFavoriteItem(data = {
  id: null,
}) {
  return {
    type: RECEIVED_ADD_FAVORITE_ITEM,
    data,
  };
}

export async function requestAddItemToFavList(data = {
  id: ''
}) {
  const addFavoriteApi = `/rest/favorite/${data.id}`;
  const response = await fetchWithAuth(addFavoriteApi, 'POST');
  console.log("response",response);
  if (response.result) {
    const msg = `user_id:${response.item.user_id}/post_id:${response.item.post_id}`;
    Alert.alert('result', `加入我的最愛成功! ${msg}`);
  }

  return (dispatch) => {
    dispatch(receivedAddFavoriteItem(response));
  };
}

// ---------------------------------------------- delete item from favorite list
function receivedDeleteFavoriteItem(data = {
  id: null,
}) {
  return {
    type: RECEIVED_DELETE_FAVORITE_ITEM,
    data,
  };
}

export async function requestDeleteItemToFavList(data = {
  id: ''
}) {
  const addFavoriteApi = `/rest/favorite/${data.id}`;
  const response = await fetchWithAuth(addFavoriteApi, 'DELETE');
  console.log(response);
  if (response.result) {
    const msg = `user_id:${response.item.user_id}/post_id:${response.item.post_id}`;
    Alert.alert(response.result, `刪除我的最愛成功! ${msg}`);
  }

  return (dispatch) => {
    dispatch(receivedDeleteFavoriteItem(response));
  };
}
