import React from 'react';
import { Redirect } from 'react-router-dom';

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';

import { useSelector } from 'react-redux'

const TheLayout = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
