
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const RECEIVED_CREATE_POST = 'RECEIVED_CREATE_POST';


function receivedCreate(photoSource) {
  return {
    type: RECEIVED_CREATE_POST,
    data: photoSource,
  };
}

export function requestCreate(data) {
  const searchApi = `http://localhost:1337/rest/post/create`;
  const response = await fetch(searchApi, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  const responseJson = await response.json();
  return (dispatch) => {
    dispatch(receivedCreate(responseJson));
  };
}
