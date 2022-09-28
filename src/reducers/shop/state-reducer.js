import {stateConstants} from '../../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  stateList: [],
  state: null,
  isLoading: false,
  activeState: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const StateReducer = (state = initialState, action) => {
  switch (action.type) {
    case stateConstants.RECEIVED_STATE_LIST:
      return {...state, stateList: action.payload.results, isLoading: false, count: action.payload.count, next: action.payload.next, previous: action.payload.previous};
    case stateConstants.STATE_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case stateConstants.STATE_SELECTED:
      return {
        ...state,
        activeState: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case stateConstants.STATE_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case stateConstants.STATE_ADD_SUCCESS:
      return {...state, state: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case stateConstants.STATE_ADD_FAILURE:
      return {...state, isLoading: false, addErrorStatus: action.error};
    case stateConstants.STATE_UPDATE_SUCCESS:
      return {...state, state: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case stateConstants.STATE_UPDATE_FAILURE:
      return {...state, isLoading: false, updateErrorStatus: action.error};
    default:
      return state;
  }
};

export default StateReducer;