import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

import 'firebase/auth'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Dashboard Layout
const TheDashboardLayout = React.lazy(() => import('./containers/Dashboard/TheDashboardLayout'));

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const MainLayout = React.lazy(() => import("./containers/MainLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {/* <Route
              exact
              path="/"
              name="Home"
              render={(props) => <Home {...props} />} /> */}
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
              name="Home"
              render={(props) => <MainLayout {...props} />} />
            <Route
              path="/dashboard"
              name="Dashboard"
              render={(props) => <TheDashboardLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
