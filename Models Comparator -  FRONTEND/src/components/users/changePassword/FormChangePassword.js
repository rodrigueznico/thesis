import React, { Component } from "react";

import "../../../css/FormChangePassword.css"

import { Form, Input, Tooltip, Icon, Button } from "antd";

class FormChangePassword extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, {password}) => {
      if (!err) {
        this.props.handleChange(password)
        this.props.form.resetFields()
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validatePassword = async (rule, value, callback) => {
    const result = await this.props.verifyPassword(value)
    if (value && result)
      callback("Contraseña incorrecta.")
    else
      callback()
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
        className="formChangePassword"
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <Form.Item 
          className="formItemChangePassword"
          label={"Ingrese su contraseña. "} 
          hasFeedback
        >
          {getFieldDecorator("ownPassword", {
            validateTrigger:'onBlur',
            rules: [
              {
                required: true,
                message: "Por favor ingrese su contraseña.",
              },
              {
                validator: this.validatePassword
              }
            ]
          })(<Input.Password autoComplete="new-password"/>)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nueva Contraseña&nbsp;
              <Tooltip title="Mínimo 8 caracteres sin contener espacios">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>} 
          hasFeedback
        >
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese su nueva contraseña.",
                min: 8
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password autoComplete="new-password2"/>)}
        </Form.Item>
        <Form.Item label="Confirmar contraseña" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Por favor confirme la nueva contraseña.",
                whitespace: true
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item className="formItemChangePassword-2" {...tailFormItemLayout}>
          <Button 
            className="buttonChangePassword"
            type="primary" 
            htmlType="submit"
            loading={this.props.loadingUser}
          >
            Confirmar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(FormChangePassword);

export default WrappedRegistrationForm;
