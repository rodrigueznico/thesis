import React from 'react';

import "../../../css/ChangePassUser.css"

import FormChangePasswordContainer from "./FormChangePasswordContainer"

class ChangePassUser extends React.Component {
  render() {
    return (
      <>
        <p className="paragraphChangePassUser">Modificar contraseña</p>
        <FormChangePasswordContainer 
          userId={this.props.userId}
          username={this.props.username}
        />
      </>
    )
  }
}

export default ChangePassUser;