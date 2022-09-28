import * as types from '../../ActionTypes';
import {sourceProductService} from '../../../services/shop/source-product/source-product';

export const addSourceProduct = (product) => {
  return dispatch => {
    dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_DATA_REQUEST_STATUS, payload: true});
    sourceProductService.addSourceProduct(product)
      .then(
        product => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_ADD_SUCCESS, payload: product});
        },
        error => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_ADD_FAILURE, error: error});
        },
      );
  };
};

export const updateSourceProduct = (product, productId) => {
  return dispatch => {
    dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_DATA_REQUEST_STATUS, payload: true});
    sourceProductService.updateSourceProduct(product, productId)
      .then(
        product => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_UPDATE_SUCCESS, payload: product});
        },
        error => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_UPDATE_FAILURE, error: error});
        },
      );
  };
};

export const handleSourceProductSearch = (text) => {
  return dispatch => {
    dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_DATA_REQUEST_STATUS, payload: true});
    sourceProductService.getFoundSourceProductList(text)
      .then(
        product => {
          dispatch({type: types.sourceProductConstants.RECEIVED_SOURCE_PRODUCT_LIST, payload: product.results});
        },
        error => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_LIST_FAILURE, error: error});
        },
      );
  };
};

export const getSourceProductList = () => {
  return dispatch => {
    dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_DATA_REQUEST_STATUS, payload: true});
    sourceProductService.getSourceProductList()
      .then(
        product => {
          dispatch({type: types.sourceProductConstants.RECEIVED_SOURCE_PRODUCT_LIST, payload: product.results});
        },
        error => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_LIST_FAILURE, error: error});
        },
      );
  };
};

export const getPaginatedSourceProductList = (url) => {
  return dispatch => {
    dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_DATA_REQUEST_STATUS, payload: true});
    sourceProductService.getPaginatedSourceProductList(url)
      .then(
        product => {
          dispatch({type: types.sourceProductConstants.RECEIVED_SOURCE_PRODUCT_LIST, payload: product.results});
        },
        error => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_LIST_FAILURE, error: error});
        },
      );
  };
};

export const getSourceProductListByShop = (shopId) => {
  return dispatch => {
    dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_DATA_REQUEST_STATUS, payload: true});
    sourceProductService.getSourceProductList(shopId)
      .then(
        product => {
          dispatch({type: types.sourceProductConstants.RECEIVED_SOURCE_PRODUCT_LIST, payload: product.products});
        },
        error => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_LIST_FAILURE, error: error});
        },
      );
  };
};

export const sourceProductSelected = (product) => dispatch => {
  dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_SELECTED, payload: product});
};

export const getPreRequisiteSourceData = () => {
  return dispatch => {
    sourceProductService.getPreRequisiteSourceData()
      .then(
        data => {
          dispatch({type: types.sourceProductConstants.PER_REQUISITE_SOURCE_PRODUCT_DATA, payload: data});
        },
        error => {
          console.log(error);
        },
      );
  };
};

export const getShopDetails = (shopId) => {
  return dispatch => {
    sourceProductService.getShopDetails(shopId)
      .then(
        data => {
          dispatch({type: types.sourceProductConstants.SOURCE_PRODUCT_SHOP, payload: data});
        },
        error => {
          console.log(error);
        },
      );
  };
};