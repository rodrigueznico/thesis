import React, { Component } from 'react';

import { connect } from "react-redux";

import FormChangePassword from "./FormChangePassword"
import { changePassword } from "../../../actions/userAction"
import { verifyPassword as verifyPasswordApi } from "../../../modelsComparatorAPI/user"

class FormChangePasswordContainer extends Component {

  handleChange = password => {
    this.props.changePasswordLocal({ id: this.props.userId, password: password });
  };

  verifyPassword = async password => {
    const result = await verifyPasswordApi({username:this.props.currentUser.username, password}, this.props.currentUser.token)
    return result;
  }

  render() {
    return (
      <FormChangePassword
        loadingUser={this.props.loadingUser}
        verifyPassword={this.verifyPassword}
        handleChange={this.handleChange}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    loadingUser: state.users.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePasswordLocal: user => {
      return dispatch(changePassword(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormChangePasswordContainer);
