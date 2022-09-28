import {authHeader} from '../../_helpers/auth-header';
import {API, handleResponse} from '../../constant';

export const stateService = {
  getStateList,
  addState,
  updateState
};

function getStateList() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}area/`, requestOptions).then(handleResponse);
}

function addState(state) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(state)
  };

  return fetch(`${API}area/`, requestOptions).then(handleResponse);
}

function updateState(state, stateId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(state)
  };

  return fetch(`${API}area/${stateId}/`, requestOptions).then(handleResponse);
}
