import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import event from "./event";

export default combineReducers({
  auth,
  event,
  message,
});
