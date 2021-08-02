import React, { Component } from 'react';

import { connect } from "react-redux";

import ProtectedRoute from "./ProtectedRoute"

class ProtectedRouteContainer extends Component {
  render() {
    return <ProtectedRoute currentUser={this.props.currentUser}/>
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

export default connect(mapStateToProps)(ProtectedRouteContainer);
