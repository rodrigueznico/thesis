import React from 'react';

import "../../../css/ChangePassUser.css"

import { connect } from "react-redux";

import ChangePassUser from "./ChangePassUser"

class ChangePassUserContainer extends React.Component {
  render() {
    return (
        <ChangePassUser 
          userId={this.props.currentUser.id}
          username={this.props.currentUser.username}
        />
    )
  }
}

const mapStateToProps = state => {
    return {
      currentUser: state.users.currentUser
    };
};

export default connect(mapStateToProps)(ChangePassUserContainer);