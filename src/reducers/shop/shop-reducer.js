import {shopConstants} from '../../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  shopList: [],
  preRequisiteList: {
    countries: [],
    states: [],
  },
  shop: null,
  isLoading: false,
  activeShop: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const ShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case shopConstants.PER_REQUISITE_SHOP_DATA:
      return {...state, preRequisiteList: action.payload, isLoading: false};
    case shopConstants.RECEIVED_SHOP_LIST:
      return {...state, shopList: action.payload.results, isLoading: false, count: action.payload.count, next: action.payload.next, previous: action.payload.previous};
    case shopConstants.SHOP_LIST_FAILURE:
      return {...state, isLoading: false, listErrorStatus: action.error, count: 0, next: null, previous: null};
    case shopConstants.SHOP_SELECTED:
      return {
        ...state,
        activeShop: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case shopConstants.SHOP_DATA_REQUEST_STATUS:
      return {...state,
        isLoading: true,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,};
    case shopConstants.SHOP_ADD_SUCCESS:
      return {...state, shop: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case shopConstants.SHOP_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case shopConstants.SHOP_UPDATE_SUCCESS:
      return {...state, shop: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case shopConstants.SHOP_UPDATE_FAILURE:
      return {...state, isLoading: false, updateErrorStatus: action.error};
    default:
      return state;
  }
};

export default ShopReducer;