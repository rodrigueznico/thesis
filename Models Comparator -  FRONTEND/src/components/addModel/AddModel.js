import React, { Component } from "react";

import "../../css/AddModel.css";

import { Upload, Button, Icon } from "antd";

class AddModel extends Component {
  state = {
    fileList: []
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    var reader = new FileReader();
    
    reader.readAsText(fileList[0], "UTF-8");

    reader.onload = evt => {
      const data = evt.target.result;
      const today = new Date();
      const date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
      const name = this.state.fileList[0].name
     
      this.props.handleUpload({
        idUser: this.props.idUser,
        modelName: name.split(".")[0],
        modelData: data,
        modelDate: date
      });
      
      this.setState({
        fileList: []
      });
    };
    
    fileList.forEach(file => {
      formData.append("files[]", file);
    });
  };

  render() {
    const { fileList } = this.state;

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(() => ({
          fileList: [file]
        }));
        return false;
      },
      fileList,
      accept: ".ddr",
      multiple: true
    };

    return (
      <div className="backAddModel">
        <div className="contentAddModel">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Seleccione archivo
            </Button>
          </Upload>
          <Button
            className="buttonAddModel" 
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={this.props.loading}
          >
            {this.props.loading ? "Cargando" : "Comenzar carga"}
          </Button>
        </div>
      </div>
    );
  }
}

export default AddModel;
