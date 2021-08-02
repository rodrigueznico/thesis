import React, { PureComponent } from "react";

import { connect } from "react-redux";

import { addModel } from "../../actions/modelAction";
import AddModel from "./AddModel"

class AddModelContainer extends PureComponent {

  handleUpload = dataModel => {
    this.props.addModelLocal(dataModel)
  };

  render() {
    return (
      <AddModel handleUpload={model => this.handleUpload(model)} idUser={this.props.idUser} loading={this.props.loading}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.models.loadingModels,
    idUser: state.users.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addModelLocal: model => {
      return dispatch(addModel(model));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModelContainer);
