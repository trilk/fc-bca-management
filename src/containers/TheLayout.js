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
  console.log(props)
  const dispatch = useDispatch()
  const authed = useSelector(state => state.auth.isAuthenticated);
  const [initializing, setInitializing] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);

  const onAuthStateChanged = (user) => {
    console.log('auth changed!')
    if (!user) {
      console.log('Chua login')
      setSignedIn(false);
      setInitializing(false);
    } else {
      console.log('Doi login:' + user)
      dispatch(setUser(user.uid));
    }
  }

  useEffect(() => {
    console.log('Vo day: ' + new Date());
    if (authed) {
      console.log('login xong')
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
