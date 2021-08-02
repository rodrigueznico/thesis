import React, { Component } from "react";

import { connect } from "react-redux"
import { message } from "antd";

import AddUser from "./AddUser"
import { registerUser, logoutUser } from "../../actions/userAction"
import { logoutModel } from "../../actions/modelAction"
import { verifyUsername as verifyUsernameApi } from "../../modelsComparatorAPI/user"
import { MESSAGE } from "../../contants/constans"

class AddUserContainer extends Component {
  
  handleAdd = ({username, role, password, fullname, email, startdate}) => {
      this.props.registerUserLocal({username, role, password, fullname, email, startdate});
  };

  onError = () => {
    message.error(MESSAGE.UNAUTHORIZED_ERROR, 4);
    this.props.logoutUserLocal();
    this.props.logoutModelLocal();
  }

  verifyUsername = async username => {
    const result = await verifyUsernameApi({username: username}, this.props.token)
    return result;
  }

  render() {
    return (
      <AddUser
          users={this.props.users} 
          loading={this.props.loadingUser}
          handleAdd={this.handleAdd}
          verifyUsername={this.verifyUsername}
          onError={this.onError}
      />
    );
  }
}
  
  const mapStateToProps = state => {
    return {
      token: state.users.currentUser.token,
      users: state.users.users,
      loadingUser: state.users.loading
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      registerUserLocal: model => {
        return dispatch(registerUser(model));
      },
      logoutUserLocal: () => {
        return dispatch(logoutUser())
      },
      logoutModelLocal: () => {
        return dispatch(logoutModel())
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddUserContainer);