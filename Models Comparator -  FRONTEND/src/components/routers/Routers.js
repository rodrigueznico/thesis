import React, { Component } from 'react';

import { Route, Switch } from "react-router-dom";

import AddModelContainer from "../addModel/AddModelContainer";
import ModelsContainer from "../models/ModelsContainer";
import ComparatorContainer from "../comparator/ComparatorContainer";
import UsersContainer from "../users/UsersContainer"
import AddUserContainer from "../addUser/AddUserContainer"
import ChangePassUserContainer from "../users/changePassword/ChangePassUserContainer"
import LogoutContainer from "../auth/LogoutContainer"
import NotFound from "../content/NotFound";

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ModelsContainer} />
        <Route path="/addmodel" component={AddModelContainer} />
        <Route path="/comparator" component={ComparatorContainer} />
        <Route path="/users" component={UsersContainer} />
        <Route path="/adduser" component={AddUserContainer} />
        <Route path="/changepassword" component={ChangePassUserContainer} />
        <Route path="/logout" component={LogoutContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Routers;