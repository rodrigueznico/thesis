import React from 'react';

import { Drawer } from 'antd';

import 'antd/dist/antd.css';

import FormChangePasswordContainer from "./FormChangePasswordContainer"

class ChangePassAdmin extends React.Component {
  render() {
    return (
        <Drawer
          width={640}
          placement="right"
          title="Modificar contraseña de usuario"
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <FormChangePasswordContainer 
            userId={this.props.userId}
            username={this.props.username}
          />
        </Drawer>
    );
  }
}

export default ChangePassAdmin;