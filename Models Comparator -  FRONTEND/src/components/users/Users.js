import React, { Component } from "react";

import "../../css/Users.css"

import { Form, Table, Input, Button, Icon, Divider, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";

import { Context } from "./Context"
import EditableCell from "./EditableCell"
import ChangePassAdmin from "./changePassword/ChangePassAdmin"

class Users extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: "",
      deletingId: "",
      changePasswordId: "",
      visibleDrawer: false
    };
    this.columns = [
      {
        title: "Nombre de usuario",
        dataIndex: "userName",
        key: "username",
        ...this.getColumnSearchProps("userName", "Nombre de usuario")
      },
      {
        title: "Rol de usuario",
        dataIndex: "role",
        key: "role",
        editable: true,
        ...this.getColumnSearchProps("role", "Rol de usuario")
      },
      {
        title: "Nombre completo",
        dataIndex: "fullname",
        key: "fullname",
        editable: true,
        ...this.getColumnSearchProps("fullname", "Nombre completo")
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
        editable: true,
        render: email => <a href={`mailto:${email}`}>{email}</a>
      },
      {
        title: "Fecha de alta",
        dataIndex: "startdate",
        key: "startdate",
      },
      {
        title: "Acción",
        key: "action",
        width: "130px",
        render: (text, record) => {
          const editable = this.isEditing(record);
          if (record.key !== this.props.currentUserId)
            return (
              <>
                {editable ? (
                  <span>
                    <Context.Consumer>
                      {form => (
                        <Popconfirm 
                          title="¿Está seguro?" 
                          cancelText="Cancelar"
                          okText="Aceptar"
                          onConfirm={() => this.save(form, record.key)}
                        >
                          {this.props.loadingUser?
                            <Icon className="iconUsers-2" type="loading" title="Guardar"/>
                            :
                            <Icon className="iconUsers" type="check-circle" theme="twoTone" title="Guardar" spin={this.props.loadingUser} twoToneColor="#52c41a"/>}
                        </Popconfirm>
                      )}
                    </Context.Consumer>
                    <Divider type="vertical" />
                      <Icon className="iconUsers" type="close-circle" theme="twoTone" twoToneColor="#f81d22" onClick={() => this.cancel(record.key)} title="Cancelar"/>
                  </span>
                ) : (
                  <span>
                    <Icon className="iconUsers" type="edit" theme="twoTone" title="Modificar" onClick={() => this.edit(record.key)}/>
                    <Divider type="vertical" />
                    <Icon className="iconUsers" type="lock" theme="twoTone" title="Modificar contraseña" onClick={ () => this.showDrawer(record)}/>
                    <Divider type="vertical" />
                    {this.props.loadingUser ?
                      (this.state.deletingId === record.key ?
                        <Icon className="iconUsers" type="delete" theme="twoTone" title="Eliminar" spin={this.props.loadingUser}/>
                      :
                        <Icon className="iconUsers" type="delete" theme="twoTone" title="Eliminar"/>)
                    :
                      <Popconfirm
                        title="¿Está seguro?"
                        cancelText="Cancelar"
                        okText="Aceptar"
                        onConfirm={() => this.handleDelete(record.key)}
                      >
                        <Icon className="iconUsers" type="delete" theme="twoTone" title="Eliminar"/>
                      </Popconfirm>
                    }
                  </span>
                )}
              </>
            )
        }
      }
    ];
  }

  showDrawer = record => {
    this.setState({
      ...this.state,
      changePasswordId: record.key,
      changePasswordUsername: record.userName,
      visibleDrawer: true,
    });
  };

  onCloseDetails = () => {
    this.setState({
      ...this.state,
      visibleDrawer: false,
    });
  };

  handleDelete = id => {
    this.props.handleDelete(id);
    this.setState( {...this.state, deletingId:id} )
  }

  handleUpdate = user => {
    this.props.handleUpdate(user);
  }

  isEditing = record => {
    return record.key === this.props.selectedRow
  }

  cancel = () => {
    this.props.handleCleanRow();
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const elem = this.props.users.find(item => key === item.key);
      let roleAux;
      if (row.role === "Administrador" || row.role === "Usuario")
        roleAux = row.role === "Administrador" ? "ADMIN" : "USER"
      else
        roleAux = row.role
      const user = {
        username: elem.userName,
        fullname: row.fullname,
        role: roleAux,
        email: row.email,
        startdate: elem.startdate,
        id: elem.key
      }
      this.handleUpdate(user);
    });
  }

  edit(key) {
    this.props.handleSelectRow(key)
  }

  getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div className="divUsers">
        <Input
          className="inputUser"
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`${placeholder}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
        />
        <Button
          className="buttonUsers"
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
        >
          Buscar
        </Button>
        <Button
          className="buttonUsers-2"
          onClick={() => this.handleReset(clearFilters)}
          size="small"
        >
          Limpiar
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => {
      return(
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )}
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ ...this.state, searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ ...this.state, searchText: "" });
  };

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'role' ? 'select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
        <Context.Provider value={this.props.form}>
          {this.state.visibleDrawer &&
            <ChangePassAdmin
              visible={this.state.visibleDrawer}
              onClose={this.onCloseDetails}
              userId={this.state.changePasswordId}
              username={this.state.changePasswordUsername}
            />
          }
          <Table
            className="tableUsers"
            components={components}
            scroll={{ x: 700 }}
            rowClassName="editable-row"
            columns={columns}
            dataSource={this.props.users}
            pagination={{
              onChange: this.cancel,
              pageSize: 6
            }}
          />
        </Context.Provider>
    );
  }
}

const EditableFormTable = Form.create()(Users);

export default EditableFormTable;
