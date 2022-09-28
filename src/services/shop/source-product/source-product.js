import {authHeader} from '../../../_helpers/auth-header';
import {API, handleResponse} from '../../../constant';


export const sourceProductService = {
  getFoundSourceProductList,
  getSourceProductList,
  getPaginatedSourceProductList,
  addSourceProduct,
  updateSourceProduct,
  getPreRequisiteSourceData,
  getShopDetails
};

function getFoundSourceProductList(text) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  if(text)
    return fetch(`${API}source-products/?search=${text}`, requestOptions).then(handleResponse);
}

function getSourceProductList(shopId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  if(shopId)
    return fetch(`${API}get_source_product_by_shop/${shopId}/`, requestOptions).then(handleResponse);
  return fetch(`${API}source-products/`, requestOptions).then(handleResponse);
}

function getPaginatedSourceProductList(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${url}`, requestOptions).then(handleResponse);
}


function getPreRequisiteSourceData() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${API}get_source_product_pre_requisite/`, requestOptions).then(handleResponse);
}

function getShopDetails(shopId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}shops/${shopId}/`, requestOptions).then(handleResponse);
}

function addSourceProduct(product) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(product),
  };

  return fetch(`${API}source-products/`, requestOptions).then(handleResponse);
}

function updateSourceProduct(product, productId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(product)
  };

  return fetch(`${API}source-products/${productId}/`, requestOptions).then(handleResponse);
}
