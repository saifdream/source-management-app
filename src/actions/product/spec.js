import * as types from '../ActionTypes';
import {specService} from '../../services/product/spec';
import {productService} from "../../services/product/product";

export const addSpec = (spec) => {
  return dispatch => {
    dispatch({type: types.productSpecConstants.PRODUCT_SPEC_DATA_REQUEST_STATUS, payload: true});
    specService.addSpec(spec)
      .then(
        spec => {
          dispatch({type: types.productSpecConstants.PRODUCT_SPEC_ADD_SUCCESS, payload: spec});
        },
        error => {
          dispatch({type: types.productSpecConstants.PRODUCT_SPEC_ADD_FAILURE, error: error});
        }
      );
  };
};

export const updateSpec = (spec, specId) => {
  return dispatch => {
    dispatch({type: types.productSpecConstants.PRODUCT_SPEC_DATA_REQUEST_STATUS, payload: true});
    specService.updateSpec(spec, specId)
      .then(
        spec => {
          dispatch({type: types.productSpecConstants.PRODUCT_SPEC_UPDATE_SUCCESS, payload: spec});
        },
        error => {
          dispatch({type: types.productSpecConstants.PRODUCT_SPEC_UPDATE_FAILURE, error: error});
        }
      );
  };
};

export const getSpecList = (shopId) => {
  return dispatch => {
    dispatch({type: types.productSpecConstants.PRODUCT_SPEC_DATA_REQUEST_STATUS, payload: true});
    specService.getSpecList(shopId)
      .then(
        spec => {

          dispatch({type: types.productSpecConstants.RECEIVED_PRODUCT_SPEC_LIST, payload: spec.results});
        },
        error => {
          dispatch({type: types.productSpecConstants.PRODUCT_SPEC_LIST_FAILURE, error: error});
        }
      );
  };
};

export const specSelected = (spec) => dispatch => {
  dispatch({type: types.productSpecConstants.PRODUCT_SPEC_SELECTED, payload: spec});
};

export const getPreRequisiteSpecData = () => {
    return dispatch => {
        specService.getPreRequisiteData()
            .then(
                data => {
                    console.log(data)
                    const attributes = {attributes : data.results};
                    console.log(attributes)
                    dispatch({type: types.productSpecConstants.PER_REQUISITE_PRODUCT_SPEC_DATA, payload: attributes});
                },
                error => {
                    console.log(error);
                },
            );
    };
};