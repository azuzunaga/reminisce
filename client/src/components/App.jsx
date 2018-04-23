import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '/Header';
const Dashboard  = () => <h2>Dashboard</h2>;
const Project  = () => <h2>Project</h2>;
const Document  = () => <h2>Document</h2>;
const Landing  = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/projects/1/1" component={Project} />
          <Route exact path="/documents/1" component={Document} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
