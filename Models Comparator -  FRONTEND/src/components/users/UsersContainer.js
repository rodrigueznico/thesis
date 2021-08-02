import React, { Component } from "react";

import { connect } from "react-redux";

import Users from "./Users"
import { deleteUser, getUsers, updateUser, selectRow, cleanRow } from "../../actions/userAction"

class UsersContainer extends Component {
  componentDidMount(){
    this.props.getUsersLocal();
  }

  handleDelete = userId => {
    this.props.deleteUserLocal(userId)
  }

  handleUpdate = user => {
    this.props.updateUserLocal(user)
  }

  handleSelectRow = userId => {
    this.props.selectRowLocal(userId);
  }

  handleCleanRow = () => {
    this.props.cleanRowLocal();
  }

  render() {
    const users = this.props.users.map( elem => {
      const {userName, fullname, startdate, email, id} = elem;
      return(
        {
          userName,
          fullname,
          role: elem.roles[0].role === "ADMIN"? "Administrador" : "Usuario",
          startdate,
          email,
          key: id,
        }
      )
    })
    return (
        <Users
          users={users}
          handleDelete={ userId => this.handleDelete(userId) }
          handleUpdate={ user => this.handleUpdate(user) }
          handleSelectRow={ userId => this.handleSelectRow(userId) }
          handleCleanRow={ () => this.handleCleanRow() }
          loadingUser={this.props.loadingUser}
          selectedRow={this.props.selectedRow}
          currentUserId={this.props.idUser}
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    idUser: state.users.currentUser.id,
    loadingUser: state.users.loading,
    selectedRow: state.users.selectedRow
  };
};

const mapDispatchToProps = dispatch => {
    return {
      getUsersLocal: () => {
        return dispatch(getUsers())
      },
      deleteUserLocal: (idUser) => {
        return dispatch(deleteUser(idUser))
      },
      updateUserLocal: (user) => {
        return dispatch(updateUser(user))
      },
      selectRowLocal: (id) => {
        return dispatch(selectRow(id))
      },
      cleanRowLocal: () => {
        return dispatch(cleanRow())
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
