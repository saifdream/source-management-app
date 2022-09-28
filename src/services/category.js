import {authFormHeader, authHeader} from '../_helpers/auth-header';
import {API, handleResponse} from '../constant';

export const categoryService = {
    getFoundCategoryList,
    getCategoryList,
    getPaginatedCategoryList,
    addCategory,
    updateCategory,
};

function getFoundCategoryList(text) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${API}categories/?search=${text}`, requestOptions).then(handleResponse);
}

function getCategoryList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${API}categories/`, requestOptions).then(handleResponse);
}

function getPaginatedCategoryList(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${url}`, requestOptions).then(handleResponse);
}

function addCategory(category) {
    const requestOptions = {
        method: 'POST',
        headers: authFormHeader(),
        // headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: category
    };
    return fetch(`${API}categories/`, requestOptions).then(handleResponse);
}

function updateCategory(category, categoryId) {
    const requestOptions = {
        method: 'PUT',
        headers: authFormHeader(),
        body: category
    };

    return fetch(`${API}categories/${categoryId}/`, requestOptions).then(handleResponse);
}
