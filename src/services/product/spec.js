import {authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';

export const specService = {
  getSpecList,
  addSpec,
  updateSpec,
  getPreRequisiteData
};

function getSpecList(productId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${API}product-attributes/?product=${productId}`, requestOptions).then(handleResponse);
}

function getPreRequisiteData() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${API}attributes/`, requestOptions).then(handleResponse);
}

function addSpec(spec) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(spec),
  };
  return fetch(`${API}product-attributes/`, requestOptions).then(handleResponse);
}

function updateSpec(spec, specId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(spec)
  };
  return fetch(`${API}product-attributes/${specId}/`, requestOptions).then(handleResponse);
}
