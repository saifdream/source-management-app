import {authFormHeader, authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';

export const imageService = {
  getImageList,
  addImage,
  updateImage
};

function getImageList(productId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}get_images_by_product/${productId}/`, requestOptions).then(handleResponse);
}

function addImage(image) {
  const requestOptions = {
    method: 'POST',
    headers: authFormHeader(),
    body: image,
  };

  return fetch(`${API}product-images/`, requestOptions).then(handleResponse);
}

function updateImage(image, imageId) {
  const requestOptions = {
    method: 'PUT',
    headers: authFormHeader(),
    body: image
  };

  return fetch(`${API}product-images/${imageId}/`, requestOptions).then(handleResponse);
}
