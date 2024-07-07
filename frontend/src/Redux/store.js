import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./UserData/userReducer";
import { notesReducer } from "./NotesData/notesReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  userReducer,
  notesReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
