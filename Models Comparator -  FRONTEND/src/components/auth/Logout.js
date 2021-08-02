import React from "react";

import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
  render() {
    this.props.handleLogout();
    return (
      <Redirect to='/login'/>
    );
  }
}

export default Logout;
