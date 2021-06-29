// import firebase from 'firebase'
import AuthService from "../services/auth.service";
import _ from 'lodash'
import { COLLECTION } from 'src/utils/_constants'

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
  firebase.auth.signInWithPopup(firebase.provider);
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

export const setSystemUser = (group, eventId, authedUser) => async (dispatch) => {
  let userInfo = null, storeUsers = [];
  let event = { id: eventId, round: 0 }

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
        personalInfo: {},
        photoUrl: authedUser.photoURL ? `${authedUser.photoURL}?type=large` : '',
        slogan: '',
        status: 'ACTIVE',
        role: 'user',
        group: group,
        joinedDate: new Date()
      }

      const userTeamRef = firebase.db.doc(`${COLLECTION.EVENT}/${eventId}/${COLLECTION.USER}/${authedUser.uid}`);
      const userTeam = await userTeamRef.get()

      try {
        sysUserRef.set(userData);
        if (!userTeam.exists) {
          userTeamRef.set({
            active: true,
            createdAt: new Date()
          })
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const eventRef = await firebase.db.doc(`${COLLECTION.EVENT_SUMMARY}/${eventId}`).get();
      const userSmr = eventRef.data().users[user.id];
      event.round = eventRef.data().currentRound

      userData = userSmr ? { ...user.data(), favTeam: userSmr.betTeam } : user.data();
    }

    const sysUsers = await firebase.db.collection('users')
      .where('status', '!=', USER_STATUS.INACTIVE)
      .where('role', '==', 'user')
      .get();
    storeUsers = sysUsers.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data().name,
        initName: doc.data().name.split(" ").map((n) => n[0]).join("."),
        avatar: doc.data().photoUrl
      };
    })

    userInfo = {
      id: authedUser.uid,
      name: userData.name,
      photoUrl: userData.photoUrl,
      isAdmin: userData.role === 'admin',
      group: userData.group,
      favTeam: userData.favTeam || '',
      // usedStar: userData.role === 'admin' ? true : userData.usedStar
    }
  }

  dispatch({
    type: SET_EVENT,
    payload: event
  });

  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user: userInfo, users: storeUsers }
  });

  dispatch({
    type: CLEAR_MESSAGE
  });
}

// Set logged in user
export const setUser = (userId) => async (dispatch) => {
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
        group: doc.data().role === 'admin' ? GROUP.ALL : doc.data().group
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
