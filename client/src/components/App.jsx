import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Modal from "./Modal";
import Header from "./Header";
import Splash from "./Splash";
import DocumentForm from './DocumentForm';
import { AuthRoute, ProtectedRoute } from "../utils/authRoutes";
import Dashboard from "./ProjectsDashboard";
import Project from "./ProjectShow";
import CombineDrafts from "./CombineDrafts";
import About from './About';
class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Modal />
            <Switch>
              <AuthRoute exact path="/" component={Splash} />
              <Header />
            </Switch>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/projects/:projectId" component={Project} />
            <ProtectedRoute exact path="/documents/:documentId" component={Document} />
            <ProtectedRoute exact path="/project/:projectId/document/:documentId" component={DocumentForm} />
            <ProtectedRoute exact path="/projects/:projectId/drafts" component={CombineDrafts} />
            <Route exact path="/about" component={About} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
