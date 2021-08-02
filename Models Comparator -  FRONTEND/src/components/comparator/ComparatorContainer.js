import React, { Component } from "react";

import { connect } from "react-redux";

import { getModels } from "../../actions/modelAction"
import Comparator from "./Comparator"


class ComparatorContainer extends Component {

  componentDidMount(){
    this.props.getModelsLocal(this.props.idUser)
  }

  render(){
    return (
        <Comparator
            models={this.props.models}
            idUser={this.props.idUser}
        />
    )
  }
}

const mapStateToProps = state => {
  return {
    models: state.models.models,
    idUser: state.users.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return{
    getModelsLocal: (idUser) => {
      return dispatch(getModels(idUser))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparatorContainer);