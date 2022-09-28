import {imageConstants} from '../../actions/ActionTypes';

const initialState = {
  imageList: [],
  image: null,
  isLoading: false,
  activeImage: null,
  listErrorStatus: null,
  addSuccessStatus: null,
  addErrorStatus: null,
  updateSuccessStatus: null,
  updateErrorStatus: null,
};

const ImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case imageConstants.RECEIVED_IMAGE_LIST:
      return {...state, imageList: action.payload, isLoading: false,};
    case imageConstants.IMAGE_LIST_FAILURE:
      return {...state, listErrorStatus: action.error, isLoading: false, count: 0, next: null, previous: null};
    case imageConstants.IMAGE_SELECTED:
      return {
        ...state,
        activeImage: action.payload,
        addSuccessStatus: null,
        addErrorStatus: null,
        updateSuccessStatus: null,
        updateErrorStatus: null,
        listErrorStatus: null,
      };
    case imageConstants.IMAGE_DATA_REQUEST_STATUS:
      return {...state, isLoading: true};
    case imageConstants.IMAGE_ADD_SUCCESS:
      return {...state, image: action.payload, isLoading: false, addSuccessStatus: 'Successfully Added'};
    case imageConstants.IMAGE_ADD_FAILURE:
      return {...state, addErrorStatus: action.error, isLoading: false,};
    case imageConstants.IMAGE_UPDATE_SUCCESS:
      return {...state, image: action.payload, isLoading: false, updateSuccessStatus: 'Successfully Updated'};
    case imageConstants.IMAGE_UPDATE_FAILURE:
      return {...state, isLoading: false, updateErrorStatus: action.error};
    default:
      return state;
  }
};

export default ImageReducer;