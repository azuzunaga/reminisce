import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Auth = ({ component: Component, path, user, exact }) => {
  if (user === null) return '';
  return (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !user ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
  );
};

const Protected = ({ component: Component, path, user, exact }) => {
  if (user === null) return '';
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/" />
    }
    />
  );
};

const mapStateToPropsAuth = state => {
  return { user: state.auth };
};

const mapStateToPropsProtected = state => {
  return { user: state.auth };
};

export const AuthRoute = withRouter(connect(mapStateToPropsAuth)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToPropsProtected)(Protected));
