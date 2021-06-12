import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIDEBAR_SHOW,
  CHANGE_LANGUAGE,
  CHANNELS,
  LOADING,
  AUTHENTICATED,
  FAVOR_TEAM
} from "../actions/types";

const initialState = {
  sidebarShow: "responsive",
  isAuthenticated: false,
  user: null,
  users: [],
  logo: {
    icon: 'euro2021',
    img: ''
  },
  lang: 'vi',
  loading: false,
  event: {
    id: 'EURO2021',
    round: 1
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
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
        user: action.payload.user,
        users: action.payload.users
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        users: []
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        users: []
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
    case FAVOR_TEAM:
      return {
        ...state,
        user: { ...state.user, favTeam: action.payload }
      };
    default:
      return state;
  }
}
