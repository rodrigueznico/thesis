import React, { Component } from "react";

import "../../css/Models.css"

import { Table, Popconfirm, Icon, Divider } from "antd";

import ModelDetails from "./ModelDetails"

class Models extends Component {
  state = {
    visibleDetails: false, 
    idModel: "",
    deletingId:""
  };

  handleDelete = (id) => {
    this.props.handleDelete(id)
    this.setState( {...this.state, deletingId:id} )
  }

  showDrawer = (idModel) => {
    this.setState({
      visibleDetails: true,
      idModel: idModel
    });
  };

  onCloseDetails = () => {
    this.setState({
      visibleDetails: false,
    });
  };

  columns = [
    {
      title: 'Nombre modelo',
      width: 100,
      dataIndex: 'modelName',
      key: '0',
    },
    {
      title: 'Fecha',
      width: 100,
      dataIndex: 'modelDate',
      key: '1',
    },
    {
      title: 'Acción',
      key: 'operation',
      width: 100,
      render: (text, record) =>
        <span>
          <Icon className="iconModels" type="profile" theme="twoTone" title="Detalle" onClick={ () => this.showDrawer(record.key)}/>
          <Divider type="vertical" />
          {this.props.loadingModels ?
            (this.state.deletingId === record.key ?
              <Icon className="iconModels" type="delete" theme="twoTone" title="Eliminar" spin={this.props.loadingModels}/>
            :
              <Icon className="iconModels" type="delete" theme="twoTone" title="Eliminar"/>)
          :
            <Popconfirm
              title="¿Está seguro?"
              cancelText="Cancelar"
              okText="Aceptar"
              icon={<Icon className="iconPopconfirmModels" type="question-circle-o"/>}
              onConfirm= {() => this.handleDelete(record.key)}
            >
              <Icon className="iconModels" type="delete" theme="twoTone" title="Eliminar"/>
            </Popconfirm>
          }
        </span>
    },
  ];

  render() {
    const models = this.props.models.map( ( {id, modelName, modelDate, modelData} ) => (
      {
        modelName,
        modelDate,
        modelData,
        key: id
      }
    ))
    return (
      <div className="divModels">
        {this.state.visibleDetails &&
          <ModelDetails
            visible={this.state.visibleDetails}
            onClose={this.onCloseDetails}
            model={models.filter(elem => elem.key === this.state.idModel)}
          />
        }
        <Table 
          className="tableModels"
          columns={this.columns} 
          dataSource={models}
          pagination={{ pageSize: 6 }}
        />
      </div>
    );
  }
}

export default Models;