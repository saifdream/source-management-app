import {productImageConstants} from '../../actions/ActionTypes';

const initialState = {
  imageList: [],
  image: null,
  isLoading: false,
  activeImage: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const ProductImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case productImageConstants.RECEIVED_PRODUCT_IMAGE_LIST:
      return {...state, imageList: action.payload, isLoading: false};
    case productImageConstants.PRODUCT_IMAGE_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case productImageConstants.PRODUCT_IMAGE_SELECTED:
      return {
        ...state,
        activeImage: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case productImageConstants.PRODUCT_IMAGE_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case productImageConstants.PRODUCT_IMAGE_ADD_SUCCESS:
      return {...state, image: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case productImageConstants.PRODUCT_IMAGE_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false};
    case productImageConstants.PRODUCT_IMAGE_UPDATE_SUCCESS:
      return {...state, image: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case productImageConstants.PRODUCT_IMAGE_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false};
    default:
      return state;
  }
};

export default ProductImageReducer;