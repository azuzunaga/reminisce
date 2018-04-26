import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
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
import SaveDiff from "./diff/SaveDiff";
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
            <Modal />
            <Switch>
              <AuthRoute exact path="/" component={Splash} />
              <Header />
            </Switch>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/projects/:projectId" component={Project} />
            <ProtectedRoute exact path="/documents/:documentId" component={Document} />
            <ProtectedRoute exact path="/document/new" component={DocumentForm} />
            <ProtectedRoute exact path="/projects/:projectId/drafts" component={CombineDrafts} />
            <ProtectedRoute exact path="/diff-test" component={() => (
                <SaveDiff saveId="5ae0c41ef283f979b9bd51ce" />
              )} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
