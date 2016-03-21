
export const REQUEST_SEARCH_POST = 'REQUEST_SEARCH_POST';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';

export async function requestSearchPost(keyword, distance, location) {
  console.log("requestSearchPost", keyword, distance, location);
  let paramArray = [];
  if(location){
    paramArray.push('lat='+location.lat);
    paramArray.push('lon='+location.lon);
  }
  if(distance){
    paramArray.push('distance='+distance);
  }
  let param = paramArray.join("&")
  let searchApi = `http://localhost:1337/rest/post/search/${keyword}?${param}`;
  let postList = await fetch(searchApi).then(response => response.json());
  return (dispatch) => {
    dispatch(receivedSearchPost(postList));
  }
}

function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList.items
  };
}
