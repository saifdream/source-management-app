import {sourceProductConstants} from '../../../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  productList: [],
  preRequisiteList: {
    products: [],
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

const SourceProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case sourceProductConstants.PER_REQUISITE_SOURCE_PRODUCT_DATA:
      return {...state, preRequisiteList: action.payload, isLoading: false,};
    case sourceProductConstants.RECEIVED_SOURCE_PRODUCT_LIST:
      return {...state, productList: action.payload, isLoading: false,};
    case sourceProductConstants.SOURCE_PRODUCT_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case sourceProductConstants.SOURCE_PRODUCT_SELECTED:
      return {
        ...state,
        activeProduct: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case sourceProductConstants.SOURCE_PRODUCT_SHOP:
      return {...state, shopDetails: action.payload, isLoading: false,};
    case sourceProductConstants.SOURCE_PRODUCT_DATA_REQUEST_STATUS:
      return {...state,
        isLoading: true,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,};
    case sourceProductConstants.SOURCE_PRODUCT_ADD_SUCCESS:
      return {...state, product: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case sourceProductConstants.SOURCE_PRODUCT_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case sourceProductConstants.SOURCE_PRODUCT_UPDATE_SUCCESS:
      return {...state, product: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case sourceProductConstants.SOURCE_PRODUCT_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false,};
    default:
      return state;
  }
};

export default SourceProductReducer;