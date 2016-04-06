import { fetchWithAuth } from '../utils/authFetch.js';
export const REQUEST_SEARCH_POST = 'REQUEST_SEARCH_POST';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';
export const RECEIVED_SEARCH_POST_NEXT = 'RECEIVED_SEARCH_POST_NEXT';


export function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList.items,
  };
}

export async function requestSearchPost(keyword, distance, location) {
  const paramArray = [];
  if (keyword) {
    paramArray.push(`keyword=${keyword}`);
  }
  if (location) {
    paramArray.push(`lat=${location.lat}`);
    paramArray.push(`lon=${location.lon}`);
  }
  if (distance) {
    paramArray.push(`distance=${distance}`);
  }
  const param = paramArray.join('&');
  const searchApi = `/rest/post/search?${param}`;
  const postList = await fetchWithAuth(searchApi);
  return (dispatch) => {
    dispatch(receivedSearchPost(postList));
  };
}

export function receivedSearchPostNextPage(postList) {
  return {
    type: RECEIVED_SEARCH_POST_NEXT,
    data: postList.items,
  };
}

export async function requestSearchPostNextPage(keyword, distance, location, from) {
  const paramArray = [];
  if (keyword) {
    paramArray.push(`keyword=${keyword}`);
  }
  if (location) {
    paramArray.push(`lat=${location.lat}`);
    paramArray.push(`lon=${location.lon}`);
  }
  if (distance) {
    paramArray.push(`distance=${distance}`);
  }
  if (from) {
    paramArray.push(`from=${from}`);
  }
  const param = paramArray.join('&');
  const searchApi = `/rest/post/search?${param}`;
  const postList = await fetchWithAuth(searchApi);
  return (dispatch) => {
    dispatch(receivedSearchPostNextPage(postList));
  };
}
