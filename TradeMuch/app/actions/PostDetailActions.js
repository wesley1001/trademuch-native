import {
  fetchWithAuth,
} from '../utils/authFetch';
import { Alert } from 'react-native';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';

// -------------------------------- using the same dispatcher with search action
export function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList,
  };
}

// --------------------------------------------------- Add item to favorite list
export async function requestAddItemToFavList(data = {
  postList: {},
  index: '',
}) {
  console.log("requestAddItemToFavList data=>",data);

  const favoriteApi = `/rest/favorite/${data.postList[data.index].id}`;
  const response = await fetchWithAuth(favoriteApi, 'POST');

  console.log("requestAddItemToFavList response=>",response);

  let postList = {};
  postList = data.postList;

  if (response.result) {
    const msg = `user_id:${response.item[0].user_id}/post_id:${response.item[0].post_id}`;
    Alert.alert('result', `加入我的最愛成功! ${msg}`);
    postList[data.index].isFav = response.result;
  } else {
    const msg = `name:${response.name}\nmessage:${response.message}`;
    Alert.alert(response.result, msg);
  }

  return (dispatch) => {
    dispatch(receivedSearchPost(postList));
  };
}

// ---------------------------------------------- delete item from favorite list
export async function requestDeleteItemToFavList(data = {
  postList: {},
  index: '',
}) {
  console.log("requestDeleteItemToFavList data=>",data);

  const favoriteApi = `/rest/favorite/${data.postList[data.index].id}`;
  const response = await fetchWithAuth(favoriteApi, 'DELETE');

  console.log("requestDeleteItemToFavList=>",response);

  let postList = {};
  postList = data.postList;

  if (response.result) {
    Alert.alert('刪除我的最愛成功!');
    postList[data.index].isFav = !response.result;
    postList[1].isFav = false;
    console.log("postList[data.index]",postList[data.index]);
  } else {
    const msg = `name:${response.name}\nmessage:${response.message}`;
    Alert.alert(response.result, msg);
  }

  return (dispatch) => {
    dispatch(receivedSearchPost(postList));
  };
}
