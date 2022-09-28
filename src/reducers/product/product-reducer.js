import {productConstants} from '../../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  productList: [],
  preRequisiteList: {
    categories: [],
    units: [],
    brands: [],
    origins: [],
  },
  product: null,
  shopDetails: {},
  isLoading: false,
  activeProduct: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.PER_REQUISITE_PRODUCT_DATA:
      return {...state, preRequisiteList: action.payload, isLoading: false,};
    case productConstants.RECEIVED_PRODUCT_LIST:
      return {...state, productList: action.payload, isLoading: false,};
    case productConstants.PRODUCT_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case productConstants.PRODUCT_SELECTED:
      return {
        ...state,
        activeProduct: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case productConstants.PRODUCT_SHOP:
      return {...state, shopDetails: action.payload, isLoading: false,};
    case productConstants.PRODUCT_DATA_REQUEST_STATUS:
      return {...state,
        isLoading: true,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,};
    case productConstants.PRODUCT_ADD_SUCCESS:
      return {...state, product: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case productConstants.PRODUCT_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case productConstants.PRODUCT_UPDATE_SUCCESS:
      return {...state, product: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case productConstants.PRODUCT_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false,};
    default:
      return state;
  }
};

export default ProductReducer;