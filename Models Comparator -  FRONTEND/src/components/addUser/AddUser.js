import React, { Component } from "react";

import "../../css/AddUser.css";

import { Form, Input, Tooltip, Icon, Select, Button } from "antd";

const { Option } = Select;

class AddUser extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, { username, role, password, fullname, email }) => {
      if (!err) {
        const today = new Date();
        const startdate = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
        this.props.handleAdd({ username, role, password, fullname, email, startdate });
        this.props.form.resetFields()
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateUserName = async (rule, value, callback) => {
    const result = await this.props.verifyUsername(value)
    if (result !== "UNAUTHORIZED")
      if (value && result)
        callback("El nombre de usuario ingresado ya existe")
      else
        callback()
    else
      this.props.onError();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Las contraseñas ingresadas son distintas!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form
        className="formAddUser"
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <p className="paragraphAddUser">Agregar Usuario</p>
        <Form.Item
          label={
            <span>
              Nombre de usuario&nbsp;
              <Tooltip title="Mínimo 6 caracteres alfanuméricos sin contener espacios">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>}
        >
          {getFieldDecorator("username", {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: "Por favor ingrese el nombre de usuario. ",
                min: 6,
                pattern: new RegExp("^[a-zA-Z0-9]{6,15}$")
              },
              {
                validator: this.validateUserName
              }
            ]
          })(<Input autoComplete="off" />)}
        </Form.Item>
        <Form.Item label={"Nombre completo"}>
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese el nombre completo",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "El e-mail ingresado no es válido"
              },
              {
                required: true,
                message: "Por favor ingrese un E-mail"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Contraseña&nbsp;
              <Tooltip title="Mínimo 8 caracteres alfanuméricos sin contener espacios">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>}
          hasFeedback
        >
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese una contraseña",
                whitespace: true,
                pattern: new RegExp("^[a-zA-Z0-9]{8,15}$")
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password autoComplete="new-password" />)}
        </Form.Item>
        <Form.Item label="Confirmar contraseña" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Por favor confirme la contraseña",
                whitespace: true
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="Rol de usuario">
          {getFieldDecorator("role", {
            initialValue: "USER",
            rules: [
              {
                required: true,
              }
            ]
          })(
            <Select>
              <Option value="USER">Usuario</Option>
              <Option value="ADMIN">Administrador</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item className="formItemAddUser" {...tailFormItemLayout} >
          <Button
            className= "buttonAddUser"
            type="primary"
            htmlType="submit"
            loading={this.props.loading}
          >
            Registrar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(AddUser);

export default WrappedRegistrationForm;
