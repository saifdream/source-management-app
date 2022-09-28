import {authFormHeader, authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';

export const imageService = {
  getImageList,
  addImage,
  updateImage
};

function getImageList(shopId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}get_image_by_shop/${shopId}/`, requestOptions).then(handleResponse);
}

function addImage(image) {
  //console.log(image)
  const requestOptions = {
    method: 'POST',
    headers: authFormHeader(),
    body: image,
  };

  return fetch(`${API}shop-images/`, requestOptions).then(handleResponse);
}

function updateImage(image, imageId) {
  const requestOptions = {
    method: 'PUT',
    headers: authFormHeader(),
    body: image
  };

  return fetch(`${API}shop-images/${imageId}/`, requestOptions).then(handleResponse);
}

/*
function handleResponse(response) {
  return response.text().then(res => {
    //console.log(res)
    let data = "";
    try {
      data = res && JSON.parse(res);
    } catch (e) {
      if (response.status === 403) {
        return Promise.reject("CSRF verification failed. Request aborted.");
      }
      return Promise.reject(e.message || "Something went wrong!");
    }
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        AsyncStorage.removeItem('credential');
        return Promise.reject("Unauthorised login detected!");
      }

      const error = (data && data.detail) || response.statusText || res;
      console.log(error);
      return Promise.reject(error);
    }

    if(data.hasOwnProperty("error")) return Promise.reject(data.error);

    return data;
  });
}*/
