import React from "react";

import { Form, Icon, Input, Button, Layout } from "antd";

import "../../css/Login.css";

class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values.username, values.password)
        this.props.form.resetFields()
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Layout className="centered-content">
          <Form onSubmit={this.handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mb-5">
                <strong>Iniciar sesión</strong>
              </h3>
            </div>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Por favor ingrese su nombre de usuario." }
                ]
              })(
                <Input
                  prefix={
                    <Icon className="iconFieldLogin" type="user" />
                  }
                  placeholder="Nombre de usuario"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Por favor ingrese su contraseña." }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" className="iconFieldLogin" />
                  }
                  type="password"
                  placeholder="Contraseña"
                />
              )}
            </Form.Item>
            <Form.Item className="formItemLogin">
              <Button

                type="primary"
                htmlType="submit"
                className="buttonLogin"
                size="large"
                loading={this.props.loadingUser}
              >
                Ingresar
                </Button>
            </Form.Item>
          </Form>
        </Layout>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default (WrappedNormalLoginForm);