import setAuthToken from "../services/authToken";
import AuthService from "../services/auth.service";
import jwt_decode from "jwt-decode";
// import { useHistory, Redirect } from 'react-router-dom';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE
} from "./types";
import { MESSAGES } from './../utils/_constants'


// Register User
export const registerUser = (userData) => dispatch => {
  return AuthService.register(userData).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );

};
// Login - get user token
export const login = userData => dispatch => {
  return AuthService.login(userData).then(
    (res) => {
      // Save to localStorage
      // Set token to localStorage
      const token = res.accessToken;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const userInfo = jwt_decode(token);

      // Set current user
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userInfo
      });

      dispatch({ type: CLEAR_MESSAGE });

      return Promise.resolve();
    },
    (error) => {
      let message = (error.response && error.response.data && error.response.data.message) || MESSAGES.UNKNOW_ERROR;

      message = message === MESSAGES.UNKNOW_ERROR ? 'common.' + message : 'login.' + message;

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

// Log user out
export const logout = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch({
    type: LOGOUT,
    payload: null
  });

  // Redirect to login
  // return history.push("/login");
};

// Set logged in user
export const setUser = (type, data) => {
  return {
    type: type,
    payload: data
  };
};


