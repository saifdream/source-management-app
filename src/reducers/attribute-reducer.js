import {attributeConstants} from '../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  attributeList: [],
  attribute: null,
  isLoading: false,
  activeAttribute: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const AttributeReducer = (state = initialState, action) => {
  switch (action.type) {
    case attributeConstants.RECEIVED_ATTRIBUTE_LIST:
      return {...state, attributeList: action.payload.results, isLoading: false, count: action.payload.count, next: action.payload.next, previous: action.payload.previous};
    case attributeConstants.ATTRIBUTE_LIST_FAILURE:
      return {...state, isLoading: false, listErrorStatus: action.error, count: 0, next: null, previous: null};
    case attributeConstants.ATTRIBUTE_SELECTED:
      return {
        ...state,
        activeAttribute: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case attributeConstants.ATTRIBUTE_DATA_REQUEST_STATUS:
      return {...state,
        isLoading: true,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,};
    case attributeConstants.ATTRIBUTE_ADD_SUCCESS:
      return {...state, attribute: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case attributeConstants.ATTRIBUTE_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case attributeConstants.ATTRIBUTE_UPDATE_SUCCESS:
      return {...state, attribute: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case attributeConstants.ATTRIBUTE_UPDATE_FAILURE:
      return {...state, isLoading: false, updateErrorStatus: action.error};
    default:
      return state;
  }
};

export default AttributeReducer;