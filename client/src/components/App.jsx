import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Splash from "./Splash";
import { AuthRoute, ProtectedRoute } from "../utils/authRoutes";
const Dashboard = () => <h2>Dashboard</h2>;
const Project = () => <h2>Project</h2>;
const Document = () => <h2>Document</h2>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Switch>
              <AuthRoute exact path="/" component={Splash} />
              <Header />
            </Switch>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/projects/1/1" component={Project} />
            <ProtectedRoute exact path="/documents/1" component={Document} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
