import React, { Component, useEffect, useState } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './helpers/PrivateRoute'
import "./scss/style.scss";
import jwt_decode from "jwt-decode";
import setAuthToken from "./services/authToken";

import { logout, setUser } from "./actions/auth";
import { AUTHENTICATED, LOGOUT } from "./actions/types";
import store from "./store";
import { auth, config } from './firebase'
import firebase from 'firebase'
import 'firebase/auth'
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Home = React.lazy(() => import("./views/pages/Home"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      // <FirebaseAuthProvider {...config} firebase={firebase}>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/"
              name="Home"
              render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Dashboard"
              render={(props) => <TheLayout {...props} />} />
            {/* <FirebaseAuthConsumer>
                {({ isSignedIn, user }) => {
                  if (isSignedIn === true) {
                    console.log('Vo auth context app');
                    // if (!isAuthed) {
                    //   store.dispatch(setUser(user.uid));
                    // }
                    store.dispatch({
                      type: AUTHENTICATED
                    });
                    return <Route
                      path="/dashboard"
                      name="Dashboard"
                      render={(props) => <TheLayout {...props} userId={user.uid} />} />
                  } else {
                    // store.dispatch({
                    //   type: LOGOUT
                    // });
                    // return <Redirect to='/500' />

                  }


                }

                }
              </FirebaseAuthConsumer> */}

          </Switch>
        </React.Suspense>
      </HashRouter>
      // </FirebaseAuthProvider>
    );
  }
}

export default App;
