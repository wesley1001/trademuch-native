import {
  fetchWithAuth,
} from '../utils/authFetch';
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const RECEIVED_CREATE_POST = 'RECEIVED_CREATE_POST';
export const RECEIVED_UPLOAD_IMG = 'RECEIVED_UPLOAD_IMG';
export const RECEIVED_INPUT_TITLE = 'RECEIVED_INPUT_TITLE';
export const RECEIVED_INPUT_DESCRIPTION = 'RECEIVED_INPUT_Description';
export const RECEIVED_ADD_POSTLIST = 'RECEIVED_ADD_POSTLIST';

function receivedCreate(data = {
  id: null,
  uuid: '',
  title: '',
  startDate: '',
  user_id: null,
  UserId: null,
}) {
  return {
    type: RECEIVED_CREATE_POST,
    data,
  };
}

function receivedAddToList(data) {
  console.log("response!!!!!!!!!", data);
  return {
    type: RECEIVED_ADD_POSTLIST,
    data,
  };
}


export async function requestCreate(data = {
  detail: {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  },
  location: {
    latitude: 23.5989208,
    longitude: 121.0173408,
  },
  images: '',
}) {
  const postCreateApi = '/rest/post/create';
  const response = await fetchWithAuth(postCreateApi, 'POST', data);
  response.location = {
    lat: data.location.latitude,
    lon: data.location.longitude,
  };
  response.pic = data.images;
  response.distance = 0;
  response.isFav = false;
  return (dispatch) => {
    dispatch(receivedCreate(response));
    dispatch(receivedAddToList(response));
  };
}

function receivedUploadImg(data = [{
  name: '',
  src: '',
}]) {
  return {
    type: RECEIVED_UPLOAD_IMG,
    data,
  };
}

export async function requestUploadImg(data = {
  picBase64: '',
}) {
  const upLoadImgApi = 'http://localhost:1337/rest/image/upload';
  const response = await fetch(upLoadImgApi, {
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

function receivedInputTitle(data) {
  return {
    type: RECEIVED_INPUT_TITLE,
    data,
  };
}

export async function requestInputTitle(title) {
  return (dispatch) => {
    dispatch(receivedInputTitle(title));
  };
}


function receivedInputDescription(data) {
  return {
    type: RECEIVED_INPUT_DESCRIPTION,
    data,
  };
}

export async function requestInputDescription(description) {
  return (dispatch) => {
    dispatch(receivedInputDescription(description));
  };
}
