import * as types from '../../ActionTypes';
import {personService} from '../../../services/shop/source-product/person';

export const addPerson = (person) => {
  return dispatch => {
    dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: true});
    personService.addPerson(person)
      .then(
        person => {
          dispatch({type: types.personConstants.PERSON_ADD_SUCCESS, payload: person});
          //dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          //dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: false});
          dispatch({type: types.personConstants.PERSON_ADD_FAILURE, error: error});
        }
      );
  };
};

export const updatePerson = (person, personId) => {
  return dispatch => {
    dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: true});
    personService.updatePerson(person, personId)
      .then(
        person => {
          dispatch({type: types.personConstants.PERSON_UPDATE_SUCCESS, payload: person});
          //dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.personConstants.PERSON_UPDATE_FAILURE, error: error});
          //dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const getPersonList = (shopId) => {
  return dispatch => {
    dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: true});
    personService.getPersonList(shopId)
      .then(
        person => {
          //console.log(person)
          dispatch({type: types.personConstants.RECEIVED_PERSON_LIST, payload: person.persons});
          //dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: false});
        },
        error => {
          dispatch({type: types.personConstants.PERSON_LIST_FAILURE, error: error});
          //dispatch({type: types.personConstants.PERSON_DATA_REQUEST_STATUS, payload: false});
        }
      );
  };
};

export const personSelected = (person) => dispatch => {
  dispatch({type: types.personConstants.PERSON_SELECTED, payload: person});
};