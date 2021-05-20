import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIDEBAR_SHOW,
  CHANGE_LANGUAGE,
  CHANNELS,
  LOADING
} from "../actions/types";

const initialState = {
  sidebarShow: "responsive",
  isAuthenticated: false,
  user: null,
  channels: [],
  lang: 'vi',
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
        user: action.payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        channels: []
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        channels: []
      };
    case SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: action.payload,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    case CHANNELS:
      return {
        ...state,
        channels: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
