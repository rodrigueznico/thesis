import React from 'react';

import "../../css/EditableCell.css"

import { Input, Form, Select } from 'antd';

import { Context } from "./Context"

const { Option } = Select;

class EditableCell extends React.Component {

  getInput = () => {
    if (this.props.inputType === 'select') {
      return(
        <Select>
          <Option value="USER">Usuario</Option>
          <Option value="ADMIN">Administrador</Option>
        </Select>
      );
    }
    return <Input />;
  };
    
  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item className="formItemEditableCell">
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Ingrese el ${title}`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <Context.Consumer>{this.renderCell}</Context.Consumer>;
  }
}

export default EditableCell;