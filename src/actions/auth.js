import AuthService from "../services/auth.service";
import _ from 'lodash'
import { COLLECTION, USER_ROLE } from 'src/utils/_constants'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  SET_EVENT
} from "./types";
import { GROUP, USER_STATUS } from './../utils/_constants'
import * as firebase from './../firebase'

export const setHeaderLogo = (logoName) => (dispatch) => {
  dispatch({})
}
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
    const { user } = await firebase.auth.signInWithEmailAndPassword(userData.username, userData.password);
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

export const fbLogin = () => async () => {

  try {
    var signIn =  await firebase.auth.signInWithPopup(firebase.provider)
      .then( (user) => {
        console.log(user);
      });    
  } catch (error) {
    console.log(error);
  }
};

export const anonymousLogin = () => async () => {
  firebase.auth.signInAnonymously();
}

export const deleteUser = (user) => async () => {
  if (user.isAnonymous) {
    user.delete()
  }
}

export const deleteAnonymousUser = () => async () => {

}
// Log user out
export const logout = () => async (dispatch) => {
  //Sign-out successful.
  dispatch({
    type: LOGOUT
  });

  firebase.auth.signOut()

  // Redirect to login
  // return history.push("/login");
};

export const setSystemUser = (eventId, authedUser) => async (dispatch) => {
  let userInfo = null, storeUsers = [];

  if (authedUser.isAnonymous) {
    userInfo = {
      id: authedUser.uid,
      isAnonymous: true
    }
  } else {
    let userData = {};
    const sysUserRef = firebase.db.collection(COLLECTION.USER).doc(authedUser.uid);
    const user = await sysUserRef.get();

    if (!user.exists) {
      userData = {
        name: authedUser.displayName || '',
        email: authedUser.email || '',
        photoUrl: authedUser.photoURL ? `${authedUser.photoURL}?type=large` : '',
        active: true,
        role: USER_ROLE.USER,
        group: '',
      }

      try {
        sysUserRef.set(userData);        
      } catch (error) {
        console.error(error);
      }
    } else {
      userData = user.data();
    }    

    userInfo = {
      id: authedUser.uid,
      name: userData.name,
      photoUrl: userData.photoUrl,
      isAdmin: userData.role === USER_ROLE.ADMIN,
      group: userData.group,
    }
  }
  
  const evtGroups = await firebase.db.collection(`${COLLECTION.EVENT}/${eventId}/groups/`).get();
  const groups = await firebase.db.collection(COLLECTION.GROUP).get();

  const storedGroups = evtGroups.docs.map((doc) => {
    var grp = _.find(groups.docs, ['id', doc.id])    
    return {id: doc.id, name: grp.data().name}
  })

  const types = await firebase.db.collection(COLLECTION.EXPENSE_TYPE).get();
  const storedTypes = types.docs.map((doc) => {
    return {id: doc.data().code, name: doc.data().name, icon: doc.data().icon}
  })

  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user: userInfo, groups: storedGroups, exTypes: storedTypes}
  });

  dispatch({
    type: CLEAR_MESSAGE
  });
}

// Set logged in user
export const setUser = (userId) => async (dispatch) => {
  const users = await firebase.db.collection('users').where('status', '!=', false).get();
  let userInfo = null;
  const storeUsers = users.docs.map((doc) => {
    if (doc.id === userId) {
      userInfo = {
        id: userId,
        name: doc.data().name,
        email: doc.data().email,
        isAdmin: doc.data().role === USER_ROLE.ADMIN,
        avatar: doc.data().photoUrl,
        group: doc.data().group
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
