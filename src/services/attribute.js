import {authFormHeader, authHeader} from '../_helpers/auth-header';
import {API, handleResponse} from '../constant';

export const attributeService = {
    getFoundAttributeList,
    getAttributeList,
    getPaginatedAttributeList,
    addAttribute,
    updateAttribute,
};

function getFoundAttributeList(text) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${API}attributes/?search=${text}`, requestOptions).then(handleResponse);
}

function getAttributeList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${API}attributes/`, requestOptions).then(handleResponse);
}

function getPaginatedAttributeList(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${url}`, requestOptions).then(handleResponse);
}

function addAttribute(attribute) {
    const requestOptions = {
        method: 'POST',
        headers: authFormHeader(),
        // headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: attribute
    };
    return fetch(`${API}attributes/`, requestOptions).then(handleResponse);
}

function updateAttribute(attribute, attributeId) {
    const requestOptions = {
        method: 'PUT',
        headers: authFormHeader(),
        body: attribute
    };

    return fetch(`${API}attributes/${attributeId}/`, requestOptions).then(handleResponse);
}
