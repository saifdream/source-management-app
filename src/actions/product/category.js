import * as types from '../ActionTypes';
import {categoryService} from '../../services/product/category';

export const addProductCategory = (category) => {
  return dispatch => {
    dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_DATA_REQUEST_STATUS, payload: true});
    categoryService.addProductCategory(category)
      .then(
        category => {
          dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_ADD_SUCCESS, payload: category});
        },
        error => {
          dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_ADD_FAILURE, error: error});
        }
      );
  };
};

export const updateProductCategory = (category, categoryId) => {
  return dispatch => {
    dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_DATA_REQUEST_STATUS, payload: true});
    categoryService.updateProductCategory(category, categoryId)
      .then(
        category => {
          dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_UPDATE_SUCCESS, payload: category});
        },
        error => {
          dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_UPDATE_FAILURE, error: error});
        }
      );
  };
};

export const getProductCategoryList = (shopId) => {
  return dispatch => {
    dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_DATA_REQUEST_STATUS, payload: true});
    categoryService.getProductCategoryList(shopId)
      .then(
        category => {

          dispatch({type: types.productCategoryConstants.RECEIVED_PRODUCT_CATEGORY_LIST, payload: category.results});
        },
        error => {
          dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_LIST_FAILURE, error: error});
        }
      );
  };
};

export const productCategorySelected = (category) => dispatch => {
  dispatch({type: types.productCategoryConstants.PRODUCT_CATEGORY_SELECTED, payload: category});
};

export const getPreRequisiteProductCategoryData = () => {
    return dispatch => {
        categoryService.getPreRequisiteData()
            .then(
                data => {
                    const categories = {attributes : data.results};
                    dispatch({type: types.productCategoryConstants.PER_REQUISITE_PRODUCT_CATEGORY_DATA, payload: categories});
                },
                error => {
                    console.log(error);
                },
            );
    };
};