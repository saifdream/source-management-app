import {userConstants} from '../actions/ActionTypes';

const initialState = {
  credential: null,
  isLoading: false,
  loginErrorStatus: null,
  logoutErrorStatus: null,
};

const StateReducer = (credential = initialState, action) => {
  //console.log(action)
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {...credential, isLoading: true};
    case userConstants.LOGIN_SUCCESS:
      return {...credential, credential: action.user, isLoading: false};
    case userConstants.LOGIN_FAILURE:
      return {...credential, isLoading: false, loginErrorStatus: action.error};
    case userConstants.LOGOUT_REQUEST:
      return {...credential, isLoading: true};
    case userConstants.LOGOUT_SUCCESS:
      return {...credential, credential: null, isLoading: false};
    case userConstants.LOGOUT_FAILURE:
      return {...credential, isLoading: false, logoutErrorStatus: action.error};
    case userConstants.SAFE_LOGOUT:
      return {...credential, credential: null, isLoading: false, loginErrorStatus: null, logoutErrorStatus: null,};
    case userConstants.RESET_USER:
      return {credential: null, isLoading: false, loginErrorStatus: null, logoutErrorStatus: null,};
    default:
      return credential;
  }
};

export default StateReducer;