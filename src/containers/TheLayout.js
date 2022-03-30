import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { logout, setUser } from "./../actions/auth";
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';

import { useSelector, useDispatch } from 'react-redux'
import { auth } from './../firebase'

const TheLayout = (props) => {
  const dispatch = useDispatch()
  const authed = useSelector(state => state.auth.isAuthenticated);
  const [initializing, setInitializing] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);

  const onAuthStateChanged = (user) => {
    if (!user || user.isAnonymous) {
      setSignedIn(false);
      setInitializing(false);
    } else {
      dispatch(setUser(user.uid));
    }
  }

  useEffect(() => {
    if (authed) {
      setSignedIn(true);
      setInitializing(false);
    }
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [authed]);

  // if (!isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

  if (initializing) {
    return <div>Loading</div>
  }

  if (!isSignedIn) {
    return <Redirect to='/login' />
  }

  return (isSignedIn ?
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div> :
    <Redirect to="/" />
  )
}

export default TheLayout
