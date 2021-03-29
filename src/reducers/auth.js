import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIDEBAR_SHOW,
} from "../actions/types";

// const isEmpty = require("is-empty");

const initialState = {
  sidebarShow: 'responsive',
  isAuthenticated: false,
  user: {},
  role: 'admin',
  loading: false
};

export default function (state = initialState, action) {

  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: action.payload
      };
    default:
      return state;
  }
}
