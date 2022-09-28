import * as types from '../ActionTypes';
import {brandService} from '../../services/product/brand';

export const addBrand = (brand) => {
  return dispatch => {
    dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: true});
    brandService.addBrand(brand)
      .then(
        brand => {
          dispatch({type: types.brandConstants.BRAND_ADD_SUCCESS, payload: brand});
          //dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          //dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: false});
          dispatch({type: types.brandConstants.BRAND_ADD_FAILURE, error: error});
        }
      );
  };
};

export const updateBrand = (brand, brandId) => {
  return dispatch => {
    dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: true});
    brandService.updateBrand(brand, brandId)
      .then(
        brand => {
          dispatch({type: types.brandConstants.BRAND_UPDATE_SUCCESS, payload: brand});
          //dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.brandConstants.BRAND_UPDATE_FAILURE, error: error});
          //dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getBrandList = () => {
  return dispatch => {
    dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: true});
    brandService.getBrandList()
      .then(
        brand => {
          dispatch({type: types.brandConstants.RECEIVED_BRAND_LIST, payload: brand});
          //dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.brandConstants.BRAND_LIST_FAILURE, error: error});
          //dispatch({type: types.brandConstants.BRAND_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const brandSelected = (brand) => dispatch => {
  dispatch({type: types.brandConstants.BRAND_SELECTED, payload: brand});
};