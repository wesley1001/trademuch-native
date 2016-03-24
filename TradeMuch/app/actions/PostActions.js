
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const RECEIVED_CREATE_POST = 'RECEIVED_CREATE_POST';
export const RECEIVED_UPLOAD_IMG = 'RECEIVED_UPLOAD_IMG';

function receivedCreate(photoSource) {
  return {
    type: RECEIVED_CREATE_POST,
    data: photoSource,
  };
}

export async function requestCreate(data) {
  const searchApi = 'http://localhost:1337/rest/post/create';
  const response = await fetch(searchApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return (dispatch) => {
    dispatch(receivedCreate(responseJson));
  };
}

function receivedUploadImg(data = {
  name: '',
  src: '',
}) {
  return {
    type: RECEIVED_UPLOAD_IMG,
    data,
  };
}

export async function requestUploadImg(data = {
  picBase64: '',
}) {
  const searchApi = 'http://localhost:1337/rest/image/upload';
  const response = await fetch(searchApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return (dispatch) => {
    dispatch(receivedUploadImg(responseJson));
  };
}
