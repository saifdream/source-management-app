import {authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';

export const categoryService = {
  getProductCategoryList,
  addProductCategory,
  updateProductCategory,
  getPreRequisiteData
};

function getProductCategoryList(productId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${API}product-categories/?product=${productId}`, requestOptions).then(handleResponse);
}

function getPreRequisiteData() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${API}categories/`, requestOptions).then(handleResponse);
}

function addProductCategory(category) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(category),
  };
  return fetch(`${API}product-categories/`, requestOptions).then(handleResponse);
}

function updateProductCategory(category, categoryId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(category)
  };
  return fetch(`${API}product-categories/${categoryId}/`, requestOptions).then(handleResponse);
}
