import React from "react";

import { connect } from "react-redux";

import { logoutUser } from "../../actions/userAction"
import { logoutModel } from "../../actions/modelAction"
import Logout from "./Logout"

class LogoutContainer extends React.Component {

  handleLogout = () => {
    this.props.localLogoutUser();
    this.props.localLogoutModel();
  }

  render() {
    return (
      <Logout handleLogout={this.handleLogout} />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    localLogoutUser: () => {
      return dispatch(logoutUser())
    },
    localLogoutModel: () => {
      return dispatch(logoutModel())
    }
  }
}

export default connect(null, mapDispatchToProps)(LogoutContainer);
