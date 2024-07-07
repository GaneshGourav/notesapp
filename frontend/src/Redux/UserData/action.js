import { USER_LOADING } from "../actionTypes";
import axios from "axios";

export const usersignup = (data) => (dispatch) => {
  dispatch({ type: USER_LOADING });

  return axios.post("https://notes-api-7d7v.onrender.com/users/register", data);
};

export const userlogin = (data) => (dispatch) => {
  dispatch({ type: USER_LOADING });

  return axios.post("https://notes-api-7d7v.onrender.com/users/login", data);
};
