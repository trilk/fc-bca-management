import React, { useEffect, useState } from 'react';
import { setSystemUser, deleteUser } from "../actions/auth";
import {
  MainContent,
  TheFooter,
  MainHeader
} from './index';

import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../firebase'

const MainLayout = () => {
  const dispatch = useDispatch()
  const authed = useSelector(state => state.auth.isAuthenticated);
  const [initializing, setInitializing] = useState(true);
  const [authedUser, setAuthedUser] = useState(null);

  const onAuthStateChanged = (user) => {
    console.log('authed changed');

    if (!user || user.isAnonymous) {
      setAuthedUser(null);
      setInitializing(false);
    } else {
      if (authedUser !== null && authedUser.isAnonymous && authedUser.uid !== user.uid) {
        dispatch(deleteUser(authedUser))
      }      
      
      setAuthedUser(user);
      dispatch(setSystemUser(process.env.REACT_APP_ACTIVE_EVENT, user));
    }
  }

  useEffect(() => {
    if (authed) {
      setInitializing(false);
    }
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [authed]);

  if (initializing) {
    return <div>Loading</div>
  }

  return (
    <div className="c-app c-default-layout flex-row">
      <div className="c-wrapper">
        <MainHeader />
        <div className="c-body">
          <MainContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default MainLayout
