// import firebase from 'firebase'
import setAuthToken from "../services/authToken";
import AuthService from "../services/auth.service";
import jwt_decode from "jwt-decode";
import _ from 'lodash'
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
import { USER_STATUS } from './../utils/_constants'
import * as firebase from './../firebase'

// Register User
export const registerUser = (userData) => (dispatch) => {
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
export const login = (userData) => async (dispatch) => {
  try {
    console.log('Vo ham login');
    const { user } = await firebase.auth.signInWithEmailAndPassword(userData.username, userData.password);
    console.log(user);
    dispatch(setUser(user.uid));
  }
  catch (error) {
    console.log(error);
    dispatch({
      type: SET_MESSAGE,
      payload: 'Dang nhap that bai. Vui long kiem tra lai email/ password',
    });
  }
};

export const fbLogin = () => async (dispatch) => {
  const { user } = await firebase.auth.signInWithPopup(firebase.provider);

  const currentUser = await firebase.db.collection('users').doc(user.uid);

  currentUser.get().then((doc) => {
    if (!doc.exists) {
      currentUser.set({
        name: user.displayName,
        email: user.email,
        phone: '',
        role: 'user'
      });
    }
    console.log(doc.data())
  });
};

// Log user out
export const logout = () => async (dispatch) => {
  await firebase.auth.signOut()

  //Sign-out successful.
  dispatch({
    type: LOGOUT
  });

  // // Remove token from local storage
  // localStorage.removeItem("jwtToken");
  // // Remove auth header for future requests
  // setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false


  // Redirect to login
  // return history.push("/login");
};

// Set logged in user
export const setUser = (userId) => async (dispatch) => {
  console.log('set user')
  const users = await firebase.db.collection('users').where('status', '!=', USER_STATUS.INACTIVE).get();
  let userInfo = null;
  const storeUsers = users.docs.map((doc) => {
    if (doc.id === userId) {
      userInfo = {
        id: userId,
        name: doc.data().name,
        email: doc.data().email,
        isAdmin: doc.data().role === 'admin',
        avatar: doc.data().photoUrl,
        group: doc.data().role === 'admin' ? '' : doc.data().group
      }
    }
    return { id: doc.id, name: doc.data().name, avatar: doc.data().photoUrl };
  });


  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user: userInfo, users: storeUsers }
  });

  dispatch({
    type: CLEAR_MESSAGE
  });
};
