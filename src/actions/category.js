import * as types from './ActionTypes';
import {categoryService} from '../services/category';

export const addCategory = (category) => {
    return dispatch => {
        dispatch({type: types.categoryConstants.CATEGORY_DATA_REQUEST_STATUS, payload: true});
        categoryService.addCategory(category)
            .then(
                category => {
                    dispatch({type: types.categoryConstants.CATEGORY_ADD_SUCCESS, payload: category});
                },
                error => {
                    dispatch({type: types.categoryConstants.CATEGORY_ADD_FAILURE, error: error});
                }
            );
    };
};

export const updateCategory = (category, categoryId) => {
    return dispatch => {
        dispatch({type: types.categoryConstants.CATEGORY_DATA_REQUEST_STATUS, payload: true});
        categoryService.updateCategory(category, categoryId)
            .then(
                category => {
                    dispatch({type: types.categoryConstants.CATEGORY_UPDATE_SUCCESS, payload: category});
                },
                error => {
                    dispatch({type: types.categoryConstants.CATEGORY_UPDATE_FAILURE, error: error});
                }
            );
    };
};

export const handleCategorySearch = (text) => {
    return dispatch => {
        dispatch({type: types.categoryConstants.CATEGORY_DATA_REQUEST_STATUS, payload: true});
        categoryService.getFoundCategoryList(text)
            .then(
                category => {
                    dispatch({type: types.categoryConstants.RECEIVED_CATEGORY_LIST, payload: category});
                },
                error => {
                    dispatch({type: types.categoryConstants.CATEGORY_LIST_FAILURE, error: error});
                }
            );
    };
};

export const getCategoryList = () => {
    return dispatch => {
        dispatch({type: types.categoryConstants.CATEGORY_DATA_REQUEST_STATUS, payload: true});
        categoryService.getCategoryList()
            .then(
                category => {
                    dispatch({type: types.categoryConstants.RECEIVED_CATEGORY_LIST, payload: category});
                },
                error => {
                    dispatch({type: types.categoryConstants.CATEGORY_LIST_FAILURE, error: error});
                }
            );
    };
};

export const getPaginatedCategoryList = (url) => {
    return dispatch => {
        dispatch({type: types.categoryConstants.CATEGORY_DATA_REQUEST_STATUS, payload: true});
        categoryService.getPaginatedCategoryList(url)
            .then(
                category => {
                    dispatch({type: types.categoryConstants.RECEIVED_CATEGORY_LIST, payload: category});
                },
                error => {
                    dispatch({type: types.categoryConstants.CATEGORY_LIST_FAILURE, error: error});
                }
            );
    };
};

export const categorySelected = (category) => dispatch => {
    dispatch({type: types.categoryConstants.CATEGORY_SELECTED, payload: category});
};
