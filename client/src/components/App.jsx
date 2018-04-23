import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Splash from './Splash';
const Dashboard  = () => <h2>Dashboard</h2>;
const Project  = () => <h2>Project</h2>;
const Document  = () => <h2>Document</h2>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Splash} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/projects/1/1" component={Project} />
            <Route exact path="/documents/1" component={Document} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
