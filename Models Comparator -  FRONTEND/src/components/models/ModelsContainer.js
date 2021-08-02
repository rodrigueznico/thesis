import React, { Component } from "react";

import { getModels, deleteModel } from "../../actions/modelAction"

import { connect } from "react-redux";

import Models from "./Models"

class ModelsContainer extends Component {

  componentDidMount(){
    this.props.getModelsLocal(this.props.idUser)
  }

  handleDelete = (id) => {
    this.props.deleteModelLocal(id)
  }
  render() {
    return (
      <Models 
        models={this.props.models} 
        loadingModels={this.props.loadingModels}
        idUser={this.props.idUser}
        handleDelete={ (id) => this.handleDelete(id) }
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    models: state.models.models,
    loadingModels: state.models.loadingModels,
    idUser: state.users.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return{
    getModelsLocal: (idUser) => {
      return dispatch(getModels(idUser))
    },
    deleteModelLocal: (id) => {
      return dispatch(deleteModel(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelsContainer);