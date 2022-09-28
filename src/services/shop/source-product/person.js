import {authFormHeader, authHeader} from '../../../_helpers/auth-header';
import {API, handleResponse} from '../../../constant';

export const personService = {
  getPersonList,
  addPerson,
  updatePerson
};

function getPersonList(shopId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${API}get_contact_person_by_shop/${shopId}/`, requestOptions).then(handleResponse);
}

function addPerson(person) {
  const requestOptions = {
    method: 'POST',
    headers: authFormHeader(),
    body: person,
  };

  return fetch(`${API}shop-contact-persons/`, requestOptions).then(handleResponse);
}

function updatePerson(person, personId) {
  const requestOptions = {
    method: 'PUT',
    headers: authFormHeader(),
    body: person
  };

  return fetch(`${API}shop-contact-persons/${personId}/`, requestOptions).then(handleResponse);
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
