import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import LoginContainer from "../auth/LoginContainer";
import ProtectedRouteContainer from "../routers/ProtectedRouteContainer"

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginContainer} />
          <Route path="/" component={ProtectedRouteContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
