import {authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';


export const productService = {
  getFoundProductList,
  getProductList,
  getPaginatedProductList,
  addProduct,
  updateProduct,
  getPreRequisiteData,
  getShopDetails
};

function getFoundProductList(text) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  if(text)
    return fetch(`${API}products/?search=${text}`, requestOptions).then(handleResponse);
}

function getProductList(shopId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}products/`, requestOptions).then(handleResponse);
}

function getPaginatedProductList(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${url}`, requestOptions).then(handleResponse);
}


function getPreRequisiteData() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${API}get_product_pre_requisite/`, requestOptions).then(handleResponse);
}

function getShopDetails(shopId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}shops/${shopId}/`, requestOptions).then(handleResponse);
}

function addProduct(product) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(product),
  };

  return fetch(`${API}products/`, requestOptions).then(handleResponse);
}

function updateProduct(product, productId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(product)
  };

  return fetch(`${API}products/${productId}/`, requestOptions).then(handleResponse);
}

/*
function handleResponse(response) {
  console.log(response)
  return response.text().then(res => {
    //console.log(res)
    let data = "";
    try {
      data = res && JSON.parse(res);
    } catch (e) {
      //console.log(e)
      console.log(response.status)
      switch (response.status) {
        case 400:
          return Promise.reject("Bad Request.");
        case 401:
          return Promise.reject("Unauthorised access!");
        case 402:
          return Promise.reject("Payment Required!");
        case 403:
          return Promise.reject("Payment Required!"); //return Promise.reject("CSRF verification failed. Request aborted.");
        case 404:
          return Promise.reject("Not Found!");
        case 405:
          return Promise.reject("Method Not Allowed!");
        case 408:
          return Promise.reject("Request Timeout!");
        case 415:
          return Promise.reject("Unsupported Media Type!");
        case 444:
          return Promise.reject("No Response!");
        case 500:
          return Promise.reject("Internal Server Error!");
        case 502:
          return Promise.reject("Bad Gateway!");
        case 503:
          return Promise.reject("Service Unavailable!");
        case 504:
          return Promise.reject("Gateway Timeout!");
        default:
          return Promise.reject(e.message || "Something went wrong!");
      }
    }
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
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
