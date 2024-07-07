import {
  USER_FAIL,
  USER_LOADING,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
} from "../actionTypes";

let initialState = {
  user: [],
  loading: false,
  error: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case USER_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default:
      return state;
  }
};
