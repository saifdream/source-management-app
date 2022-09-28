import * as types from '../ActionTypes';
import {productService} from '../../services/product/product';

export const addProduct = (product) => {
  return dispatch => {
    dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: true});
    productService.addProduct(product)
      .then(
        product => {
          dispatch({type: types.productConstants.PRODUCT_ADD_SUCCESS, payload: product});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
          dispatch({type: types.productConstants.PRODUCT_ADD_FAILURE, error: error});
        },
      );
  };
};

export const updateProduct = (product, productId) => {
  return dispatch => {
    dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: true});
    productService.updateProduct(product, productId)
      .then(
        product => {
          dispatch({type: types.productConstants.PRODUCT_UPDATE_SUCCESS, payload: product});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.productConstants.PRODUCT_UPDATE_FAILURE, error: error});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
      );
  };
};

export const handleProductSearch = (text) => {
  return dispatch => {
    dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: true});
    productService.getFoundProductList(text)
      .then(
        product => {
          dispatch({type: types.productConstants.RECEIVED_PRODUCT_LIST, payload: product.results});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.productConstants.PRODUCT_LIST_FAILURE, error: error});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
      );
  };
};

export const getProductList = () => {
  return dispatch => {
    dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: true});
    productService.getProductList()
      .then(
        product => {
          dispatch({type: types.productConstants.RECEIVED_PRODUCT_LIST, payload: product.results});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.productConstants.PRODUCT_LIST_FAILURE, error: error});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
      );
  };
};

export const getPaginatedProductList = (url) => {
  return dispatch => {
    dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: true});
    productService.getPaginatedProductList(url)
      .then(
        product => {
          dispatch({type: types.productConstants.RECEIVED_PRODUCT_LIST, payload: product.results});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.productConstants.PRODUCT_LIST_FAILURE, error: error});
          //dispatch({type: types.productConstants.PRODUCT_DATA_REQUEST_STATUS, payload: false});
        },
      );
  };
};

export const productSelected = (product) => dispatch => {
  dispatch({type: types.productConstants.PRODUCT_SELECTED, payload: product});
};

export const getPreRequisiteData = () => {
  return dispatch => {
    productService.getPreRequisiteData()
      .then(
        data => {
          dispatch({type: types.productConstants.PER_REQUISITE_PRODUCT_DATA, payload: data});
        },
        error => {
          console.log(error);
        },
      );
  };
};