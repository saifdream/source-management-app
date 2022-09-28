import {authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';

export const shopService = {
  getFoundShopList,
  getShopList,
  getPaginatedShopList,
  addShop,
  updateShop,
  getPreRequisiteData,
};

function getFoundShopList(text) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${API}shops/?search=${text}`, requestOptions).then(handleResponse);
}

function getShopList() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${API}shops/`, requestOptions).then(handleResponse);
}

function getPaginatedShopList(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${url}`, requestOptions).then(handleResponse);
}

function getPreRequisiteData() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${API}get_shop_pre_requisite/`, requestOptions).then(handleResponse);
}

function addShop(shop) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    // headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(shop)
  };
  return fetch(`${API}shops/`, requestOptions).then(handleResponse);
}

function updateShop(shop, shopId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(shop)
  };

  return fetch(`${API}shops/${shopId}/`, requestOptions).then(handleResponse);
}

/*
function handleResponse(response) {
  return response.text().then(res => {
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
      //console.log(error)
      return Promise.reject(error);
    }

    if(data.hasOwnProperty("error")) return Promise.reject(data.error);

    return data;
  });
}*/
