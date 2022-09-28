import * as types from '../ActionTypes';
import {shopService} from '../../services/shop/shop';

export const addShop = (shop) => {
  return dispatch => {
    dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: true});
    shopService.addShop(shop)
      .then(
        shop => {
          dispatch({type: types.shopConstants.SHOP_ADD_SUCCESS, payload: shop});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
          dispatch({type: types.shopConstants.SHOP_ADD_FAILURE, error: error});
        }
      );
  };
};

export const updateShop = (shop, shopId) => {
  return dispatch => {
    dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: true});
    shopService.updateShop(shop, shopId)
      .then(
        shop => {
          dispatch({type: types.shopConstants.SHOP_UPDATE_SUCCESS, payload: shop});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.shopConstants.SHOP_UPDATE_FAILURE, error: error});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const handleShopSearch = (text) => {
  return dispatch => {
    dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: true});
    shopService.getFoundShopList(text)
      .then(
        shop => {
          dispatch({type: types.shopConstants.RECEIVED_SHOP_LIST, payload: shop});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.shopConstants.SHOP_LIST_FAILURE, error: error});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getShopList = () => {
  return dispatch => {
    dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: true});
    shopService.getShopList()
      .then(
        shop => {
          dispatch({type: types.shopConstants.RECEIVED_SHOP_LIST, payload: shop});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.shopConstants.SHOP_LIST_FAILURE, error: error});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getPaginatedShopList = (url) => {
  return dispatch => {
    dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: true});
    shopService.getPaginatedShopList(url)
      .then(
        shop => {
          dispatch({type: types.shopConstants.RECEIVED_SHOP_LIST, payload: shop});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.shopConstants.SHOP_LIST_FAILURE, error: error});
          //dispatch({type: types.shopConstants.SHOP_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getPreRequisiteData = () => {
  return dispatch => {
    shopService.getPreRequisiteData()
      .then(
        data => {
          dispatch({type: types.shopConstants.PER_REQUISITE_SHOP_DATA, payload: data});
        },
        error => {
          console.log(error)
        }
      );
  };
};

export const shopSelected = (shop) => dispatch => {
  dispatch({type: types.shopConstants.SHOP_SELECTED, payload: shop});
};
