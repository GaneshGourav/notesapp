import {
  NOTES_CREATE_LOADING,
  NOTES_FAIL,
  NOTES_GET_SUCCESS,
  NOTES_LOADING,
  NOTES_UPDATE_LOADING,
} from "../actionTypes";
import axios from "axios";

export const notesget = (tokens) => (dispatch) => {
  dispatch({ type: NOTES_LOADING });

  axios
    .get("https://notes-api-7d7v.onrender.com/notes", {
      headers: {
        Authorization: `Bearer ${tokens}`,
      },
    })
    .then((res) => {
      dispatch({ type: NOTES_GET_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: NOTES_FAIL });
    });
};

export const notescreate = (data, tokens) => (dispatch) => {
  dispatch({ type: NOTES_CREATE_LOADING });

  return axios.post("https://notes-api-7d7v.onrender.com/notes/create", data, {
    headers: {
      Authorization: `Bearer ${tokens}`,
    },
  });
};

export const notesupdate = (data, id, tokens) => (dispatch) => {
  dispatch({ type: NOTES_UPDATE_LOADING });

  return axios.patch(
    `https://notes-api-7d7v.onrender.com/notes/update/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${tokens}`,
      },
    }
  );
};

export const notesdelete = (id, tokens) => (dispatch) => {
  dispatch({ type: NOTES_LOADING });

  return axios.delete(
    `https://notes-api-7d7v.onrender.com/notes/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${tokens}`,
      },
    }
  );
};
