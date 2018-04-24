import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Modal from "./Modal";
import Header from "./Header";
import Splash from "./Splash";
import DocumentForm from './DocumentForm';
import { AuthRoute, ProtectedRoute } from "../utils/authRoutes";
import Dashboard from "./ProjectsDashboard"
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
            <Modal />
            <Switch>
              <AuthRoute exact path="/" component={Splash} />
              <Header />
            </Switch>
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/projects/1/1" component={Project} />
            <ProtectedRoute exact path="/documents/1" component={Document} />
            <ProtectedRoute exact path="/document/new" component={DocumentForm} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
