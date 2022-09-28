import {brandConstants} from '../../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  brandList: [],
  brand: null,
  isLoading: false,
  activeBrand: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const BrandReducer = (state = initialState, action) => {
  switch (action.type) {
    case brandConstants.RECEIVED_BRAND_LIST:
      return {
        ...state,
        brandList: action.payload.results,
        isLoading: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case brandConstants.BRAND_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case brandConstants.BRAND_SELECTED:
      return {
        ...state,
        activeBrand: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case brandConstants.BRAND_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case brandConstants.BRAND_ADD_SUCCESS:
      return {...state, brand: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case brandConstants.BRAND_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false};
    case brandConstants.BRAND_UPDATE_SUCCESS:
      return {...state, brand: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case brandConstants.BRAND_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false};
    default:
      return state;
  }
};

export default BrandReducer;