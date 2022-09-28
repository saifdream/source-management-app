import {productConstants, productSpecConstants} from '../../actions/ActionTypes';

const initialState = {
  specList: [],
  preRequisiteList: {
    attributes: [],
  },
  spec: null,
  isLoading: false,
  activeSpec: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const ProductSpecReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.PER_REQUISITE_PRODUCT_SPEC_DATA:
      return {...state, preRequisiteList: action.payload, isLoading: false,};
    case productSpecConstants.RECEIVED_PRODUCT_SPEC_LIST:
      return {...state, specList: action.payload, isLoading: false,};
    case productSpecConstants.PRODUCT_SPEC_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case productSpecConstants.PRODUCT_SPEC_SELECTED:
      return {
        ...state,
        activeSpec: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case productSpecConstants.PRODUCT_SPEC_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case productSpecConstants.PRODUCT_SPEC_ADD_SUCCESS:
      return {...state, spec: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case productSpecConstants.PRODUCT_SPEC_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case productSpecConstants.PRODUCT_SPEC_UPDATE_SUCCESS:
      return {...state, spec: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case productSpecConstants.PRODUCT_SPEC_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false,};
    default:
      return state;
  }
};

export default ProductSpecReducer;