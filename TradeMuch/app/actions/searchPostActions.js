
export const REQUEST_SEARCH_POST = 'REQUEST_SEARCH_POST';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';

export async function requestSearchPost(location, keyword) {
  let searchApi = `http://localhost:1337/rest/post/search/${keyword}`;
  let postList = await fetch(searchApi).then(response => response.json());
  return (dispatch) => {
    dispatch(receivedSearchPost(postList));
  }
}

function receivedSearchPost(postList) {
  console.log("received",postList.items);
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList.items
  };
}
