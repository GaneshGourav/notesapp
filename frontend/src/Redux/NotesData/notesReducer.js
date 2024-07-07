import {
  NOTES_CREATE_LOADING,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_SUCCESS,
  NOTES_FAIL,
  NOTES_GET_SUCCESS,
  NOTES_LOADING,
  NOTES_UPDATE_LOADING,
  NOTES_UPDATE_SUCCESS,
} from "../actionTypes";

let initialState = {
  data: [],
  loading: false,
  create_loading: false,
  update_loading: false,
  error: false,
};

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTES_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case NOTES_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: payload,
      };
    }
    case NOTES_CREATE_LOADING: {
      return {
        ...state,
        create_loading: true,
      };
    }
    case NOTES_UPDATE_LOADING: {
      return {
        ...state,
        update_loading: true,
      };
    }
    case NOTES_CREATE_SUCCESS: {
      return {
        ...state,
        create_loading: false,
      };
    }
    case NOTES_UPDATE_SUCCESS: {
      return {
        ...state,
        update_loading: false,
      };
    }
    case NOTES_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case NOTES_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
        create_loading: false,
        update_loading: false,
      };
    }

    default:
      return state;
  }
};
