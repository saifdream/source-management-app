import {productConstants, productCategoryConstants} from '../../actions/ActionTypes';

const initialState = {
  categoryList: [],
  preRequisiteList: {
    categories: [],
  },
  category: null,
  isLoading: false,
  activeCategory: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const ProductCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.PER_REQUISITE_PRODUCT_CATEGORY_DATA:
      return {...state, preRequisiteList: action.payload, isLoading: false,};
    case productCategoryConstants.RECEIVED_PRODUCT_CATEGORY_LIST:
      return {...state, categoryList: action.payload, isLoading: false,};
    case productCategoryConstants.PRODUCT_CATEGORY_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case productCategoryConstants.PRODUCT_CATEGORY_SELECTED:
      return {
        ...state,
        activeCategory: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case productCategoryConstants.PRODUCT_CATEGORY_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case productCategoryConstants.PRODUCT_CATEGORY_ADD_SUCCESS:
      return {...state, category: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case productCategoryConstants.PRODUCT_CATEGORY_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case productCategoryConstants.PRODUCT_CATEGORY_UPDATE_SUCCESS:
      return {...state, category: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case productCategoryConstants.PRODUCT_CATEGORY_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false,};
    default:
      return state;
  }
};

export default ProductCategoryReducer;