import React from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

import { login } from "../../actions/userAction";
import Login from "./Login"

class LoginContainer extends React.Component {

  handleSubmit = (username, password)  => {
    this.props.loginLocal(username, password);
  };

  render() {
    return (
      <>
        {Object.keys(this.props.currentUser).length === 0 ?
          <Login
            loadingUser={this.props.loadingUser} 
            handleSubmit={ (username, password) => this.handleSubmit(username, password) }
          />
        :
          <Redirect to="/"/>
        }
      </>
    );
  }
}
  
const mapStateToProps = state => {
  return {
    loadingUser: state.users.loading,
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginLocal: (userName, password) => {
      return dispatch(login(userName, password));
    }
  }
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
  