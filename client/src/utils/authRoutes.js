import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
  );
};

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToPropsAuth = state => {
  return { loggedIn: !!state.auth };
};

const mapStateToPropsProtected = state => {
  return { loggedIn: state.auth !== false };
};

export const AuthRoute = withRouter(connect(mapStateToPropsAuth)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToPropsProtected)(Protected));
