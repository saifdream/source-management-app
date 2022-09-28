import {categoryConstants} from '../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  categoryList: [],
  category: null,
  isLoading: false,
  activeCategory: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.RECEIVED_CATEGORY_LIST:
      return {...state, categoryList: action.payload.results, isLoading: false, count: action.payload.count, next: action.payload.next, previous: action.payload.previous};
    case categoryConstants.CATEGORY_LIST_FAILURE:
      return {...state, isLoading: false, listErrorStatus: action.error, count: 0, next: null, previous: null};
    case categoryConstants.CATEGORY_SELECTED:
      return {
        ...state,
        activeCategory: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case categoryConstants.CATEGORY_DATA_REQUEST_STATUS:
      return {...state,
        isLoading: true,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,};
    case categoryConstants.CATEGORY_ADD_SUCCESS:
      return {...state, category: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case categoryConstants.CATEGORY_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case categoryConstants.CATEGORY_UPDATE_SUCCESS:
      return {...state, category: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case categoryConstants.CATEGORY_UPDATE_FAILURE:
      return {...state, isLoading: false, updateErrorStatus: action.error};
    default:
      return state;
  }
};

export default CategoryReducer;