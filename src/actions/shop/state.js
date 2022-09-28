import * as types from '../ActionTypes';
import {stateService} from '../../services/shop/state';

export const addState = (state) => {
  return dispatch => {
    dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: true});
    stateService.addState(state)
      .then(
        state => {
          dispatch({type: types.stateConstants.STATE_ADD_SUCCESS, payload: state});
          //dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          //dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: false});
          dispatch({type: types.stateConstants.STATE_ADD_FAILURE, error: error});
        }
      );
  };
};

export const updateState = (state, stateId) => {
  return dispatch => {
    dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: true});
    stateService.updateState(state, stateId)
      .then(
        state => {
          dispatch({type: types.stateConstants.STATE_UPDATE_SUCCESS, payload: state});
          //dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.stateConstants.STATE_UPDATE_FAILURE, error: error});
          //dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getStateList = () => {
  return dispatch => {
    dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: true});
    stateService.getStateList()
      .then(
        state => {
          dispatch({type: types.stateConstants.RECEIVED_STATE_LIST, payload: state});
          //dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.stateConstants.STATE_LIST_FAILURE, error: error});
          //dispatch({type: types.stateConstants.STATE_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const stateSelected = (state) => dispatch => {
  dispatch({type: types.stateConstants.STATE_SELECTED, payload: state});
};