import * as types from './ActionTypes';
import {attributeService} from '../services/attribute';

export const addAttribute = (attribute) => {
    return dispatch => {
        dispatch({type: types.attributeConstants.ATTRIBUTE_DATA_REQUEST_STATUS, payload: true});
        attributeService.addAttribute(attribute)
            .then(
                attribute => {
                    dispatch({type: types.attributeConstants.ATTRIBUTE_ADD_SUCCESS, payload: attribute});
                },
                error => {
                    dispatch({type: types.attributeConstants.ATTRIBUTE_ADD_FAILURE, error: error});
                }
            );
    };
};

export const updateAttribute = (attribute, attributeId) => {
    return dispatch => {
        dispatch({type: types.attributeConstants.ATTRIBUTE_DATA_REQUEST_STATUS, payload: true});
        attributeService.updateAttribute(attribute, attributeId)
            .then(
                attribute => {
                    dispatch({type: types.attributeConstants.ATTRIBUTE_UPDATE_SUCCESS, payload: attribute});
                },
                error => {
                    dispatch({type: types.attributeConstants.ATTRIBUTE_UPDATE_FAILURE, error: error});
                }
            );
    };
};

export const handleAttributeSearch = (text) => {
    return dispatch => {
        dispatch({type: types.attributeConstants.ATTRIBUTE_DATA_REQUEST_STATUS, payload: true});
        attributeService.getFoundAttributeList(text)
            .then(
                attribute => {
                    dispatch({type: types.attributeConstants.RECEIVED_ATTRIBUTE_LIST, payload: attribute});
                },
                error => {
                    dispatch({type: types.attributeConstants.ATTRIBUTE_LIST_FAILURE, error: error});
                }
            );
    };
};

export const getAttributeList = () => {
    return dispatch => {
        dispatch({type: types.attributeConstants.ATTRIBUTE_DATA_REQUEST_STATUS, payload: true});
        attributeService.getAttributeList()
            .then(
                attribute => {
                    dispatch({type: types.attributeConstants.RECEIVED_ATTRIBUTE_LIST, payload: attribute});
                },
                error => {
                    dispatch({type: types.attributeConstants.ATTRIBUTE_LIST_FAILURE, error: error});
                }
            );
    };
};

export const getPaginatedAttributeList = (url) => {
    return dispatch => {
        dispatch({type: types.attributeConstants.ATTRIBUTE_DATA_REQUEST_STATUS, payload: true});
        attributeService.getPaginatedAttributeList(url)
            .then(
                attribute => {
                    dispatch({type: types.attributeConstants.RECEIVED_ATTRIBUTE_LIST, payload: attribute});
                },
                error => {
                    dispatch({type: types.attributeConstants.ATTRIBUTE_LIST_FAILURE, error: error});
                }
            );
    };
};

export const attributeSelected = (attribute) => dispatch => {
    dispatch({type: types.attributeConstants.ATTRIBUTE_SELECTED, payload: attribute});
};
