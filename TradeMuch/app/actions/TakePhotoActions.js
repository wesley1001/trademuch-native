
export const REQUEST_TAKE_PHOTO = 'REQUEST_TAKE_PHOTO';
export const RECEIVED_TAKE_PHOTO = 'RECEIVED_TAKE_PHOTO';


function receivedTakePhoto(photoSource) {
  return {
    type: RECEIVED_TAKE_PHOTO,
    data: photoSource,
  };
}

export function requestTakePhoto(photoSource) {
  return (dispatch) => {
    dispatch(receivedTakePhoto(photoSource));
  };
}
