import {personConstants} from '../../../actions/ActionTypes';

const initialState = {
  personList: [],
  person: null,
  isLoading: false,
  activePerson: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const PersonReducer = (state = initialState, action) => {
  switch (action.type) {
    case personConstants.RECEIVED_PERSON_LIST:
      return {...state, personList: action.payload, isLoading: false,};
    case personConstants.PERSON_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case personConstants.PERSON_SELECTED:
      return {
        ...state,
        activePerson: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case personConstants.PERSON_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case personConstants.PERSON_ADD_SUCCESS:
      return {...state, person: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case personConstants.PERSON_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case personConstants.PERSON_UPDATE_SUCCESS:
      return {...state, person: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case personConstants.PERSON_UPDATE_FAILURE:
      return {...state, updateErrorStatus: action.error, isLoading: false,};
    default:
      return state;
  }
};

export default PersonReducer;