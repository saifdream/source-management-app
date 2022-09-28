import {authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';

export const brandService = {
  getBrandList,
  addBrand,
  updateBrand
};

function getBrandList() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}brands/`, requestOptions).then(handleResponse);
}

function addBrand(brand) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    //headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(brand)
  };

  return fetch(`${API}brands/`, requestOptions).then(handleResponse);
}

function updateBrand(brand, brandId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(brand)
  };

  return fetch(`${API}brands/${brandId}/`, requestOptions).then(handleResponse);
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
      console.log(error)
      return Promise.reject(error);
    }

    if(data.hasOwnProperty("error")) return Promise.reject(data.error);

    return data;
  });
}*/
