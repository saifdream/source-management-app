import {unitConstants} from '../../actions/ActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  unitList: [],
  unit: null,
  isLoading: false,
  activeUnit: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const UnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case unitConstants.RECEIVED_UNIT_LIST:
      return {
        ...state,
        unitList: action.payload.results,
        isLoading: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case unitConstants.UNIT_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case unitConstants.UNIT_SELECTED:
      return {
        ...state,
        activeUnit: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case unitConstants.UNIT_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case unitConstants.UNIT_ADD_SUCCESS:
      return {...state, unit: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case unitConstants.UNIT_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false};
    case unitConstants.UNIT_UPDATE_SUCCESS:
      return {...state, unit: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case unitConstants.UNIT_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false};
    default:
      return state;
  }
};

export default UnitReducer;