import * as types from '../ActionTypes';
import {unitService} from '../../services/product/unit';

export const addUnit = (unit) => {
  return dispatch => {
    dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS});
    unitService.addUnit(unit)
      .then(
        unit => {
          dispatch({type: types.unitConstants.UNIT_ADD_SUCCESS, payload: unit});
          //dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.unitConstants.UNIT_ADD_FAILURE, error: error});
          //dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const updateUnit = (unit, unitId) => {
  return dispatch => {
    dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS});
    unitService.updateUnit(unit, unitId)
      .then(
        unit => {
          dispatch({type: types.unitConstants.UNIT_UPDATE_SUCCESS, payload: unit});
          //dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.unitConstants.UNIT_UPDATE_FAILURE, error: error});
          //dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getUnitList = () => {
  return dispatch => {
    dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS});
    unitService.getUnitList()
      .then(
        unit => {
          dispatch({type: types.unitConstants.RECEIVED_UNIT_LIST, payload: unit});
          //dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.unitConstants.UNIT_LIST_FAILURE, error: error});
          //dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };

  /*try {
    dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: true});
    await axios({
      method: 'GET',
      url: `${API}units/`,
    }).then(function(res) {
      console.log(res.data);
      dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
      dispatch({type: types.unitConstants.RECEIVED_UNIT_LIST, payload: res['data']['results']});
    }).catch(function(error) {
      dispatch({type: types.unitConstants.UNIT_DATA_REQUEST_STATUS, payload: false});
      console.log(error);
    });
  } catch (error) {
    console.error(error);
  }*/
};

export const unitSelected = (unit) => dispatch => {
  //console.log("Selected")
  dispatch({type: types.unitConstants.UNIT_SELECTED, payload: unit});
};