import * as types from '../ActionTypes';
import {imageService} from '../../services/shop/image';

export const addImage = (image) => {
  return dispatch => {
    dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: true});
    imageService.addImage(image)
      .then(
        image => {
          dispatch({type: types.imageConstants.IMAGE_ADD_SUCCESS, payload: image});
          //dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          //dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: false});
          dispatch({type: types.imageConstants.IMAGE_ADD_FAILURE, error: error});
        }
      );
  };
};

export const updateImage = (image, imageId) => {
  return dispatch => {
    dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: true});
    imageService.updateImage(image, imageId)
      .then(
        image => {
          dispatch({type: types.imageConstants.IMAGE_UPDATE_SUCCESS, payload: image});
          //dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.imageConstants.IMAGE_UPDATE_FAILURE, error: error});
          //dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getImageList = (shopId) => {
  return dispatch => {
    dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: true});
    imageService.getImageList(shopId)
      .then(
        image => {
          dispatch({type: types.imageConstants.RECEIVED_IMAGE_LIST, payload: image.images});
          //dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.imageConstants.IMAGE_LIST_FAILURE, error: error});
          //dispatch({type: types.imageConstants.IMAGE_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const imageSelected = (image) => dispatch => {
  dispatch({type: types.imageConstants.IMAGE_SELECTED, payload: image});
};