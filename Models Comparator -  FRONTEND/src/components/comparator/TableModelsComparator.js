import React from "react";

import "../../css/TableModelsComparator.css"

import { Table, Select } from "antd";

import { VARIABLES } from "../../contants/constans"

const { Option } = Select;

const initChildren = () => {
  const children = [];
  children.push(<Option key={VARIABLES[0]}>Vientres a servicio</Option>);
  children.push(<Option key={VARIABLES[1]}>Tasa de preñez</Option>);
  children.push(<Option key={VARIABLES[2]}>Has. ganaderas efectivas</Option>);
  children.push(<Option key={VARIABLES[3]}>Prod. de carne/ha</Option>);
  children.push(<Option key={VARIABLES[4]}>M.B. largo plazo</Option>);
  children.push(<Option key={VARIABLES[5]}>Ingreso neto/ha</Option>);
  children.push(<Option key={VARIABLES[6]}>Gastos directos/ha</Option>);
  children.push(<Option key={VARIABLES[7]}>Costos directos/ha</Option>);
  children.push(<Option key={VARIABLES[8]}>Prod. de carne/racion prod.</Option>);
  children.push(<Option key={VARIABLES[9]}>Prod. de carne/EV</Option>);
  children.push(<Option key={VARIABLES[10]}>Carga EV/HA</Option>);
  children.push(<Option key={VARIABLES[11]}>Precio terneros machos</Option>);
  children.push(<Option key={VARIABLES[12]}>Edad servicio vaquillonas</Option>);
  children.push(<Option key={VARIABLES[13]}>Prom. diario req.</Option>);
  children.push(<Option key={VARIABLES[14]}>Prom. diario oferta</Option>);
  children.push(<Option key={VARIABLES[15]}>Prom. diario balance preliminar</Option>);
  children.push(<Option key={VARIABLES[16]}>Receptividad racion/ha</Option>);
  children.push(<Option key={VARIABLES[17]}>Dist. preñez vacas</Option>);
  children.push(<Option key={VARIABLES[18]}>Dist. preñez vaq.</Option>);
  children.push(<Option key={VARIABLES[19]}>Cantidad de vacas</Option>);
  children.push(<Option key={VARIABLES[20]}>Cantidad vaquillonas</Option>);

  return children;
}

const initColumns = () => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: VARIABLES[21],
      fixed: "left",
      width: 150,
    },
    {
      title: "Vientres a servicio",
      dataIndex: VARIABLES[0]
    },
    {
      title: "Tasa de preñez",
      dataIndex: VARIABLES[1],
    },
    {
      title: "Has. ganaderas efectivas",
      dataIndex: VARIABLES[2]
    },
    {
      title: "Prod. de carne/ha",
      dataIndex: VARIABLES[3]
    },
    {
      title: "M.B. largo plazo",
      dataIndex: VARIABLES[4]
    },
    {
      title: "Ingreso neto/ha",
      dataIndex: VARIABLES[5]
    },
    {
      title: "Gastos directos/ha",
      dataIndex: VARIABLES[6]
    },
    {
      title: "Costos directos/ha",
      dataIndex: VARIABLES[7]
    },
  ]
  return columns;
}

class TableModelsComparator extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedRowKeys: [],
      children: initChildren(),
      columns: initColumns(),
      data: [],
      sizeScroll:1500
    };
  }

  componentDidUpdate (){
    if (this.state.data.length !== this.props.models.length){
      const data = this.props.models.map( ( {id, modelName, modelData} ) => (
        {
          modelName,
          ...modelData,
          key: id
        }
      ))
      this.setState({
        ...this.state,
        data
      })
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ ...this.state, selectedRowKeys });
    this.handleDataSelectedChange(selectedRowKeys);
  };

  handleDataSelectedChange = (selectedRowKeys) => {
    let data = [];
    for (let i = 0; i < selectedRowKeys.length; i++) {
      data.push(this.state.data[i]);
      
    }
    this.props.handleDataChange(data);
  }

  handleChangeSelected = value => {
    const columns= [{title: "Nombre", dataIndex: VARIABLES[21], fixed: "left", width: 150}];
    let length = 0;
    
    let x = this.state.children.filter( elem => value.includes(elem.key) )

    x.forEach(elem => {
      columns.push({ title: elem.props.children, dataIndex: elem.key })
      length += elem.props.children.length
    })

    const sizeScroll = length*11
    this.setState({...this.state, columns, sizeScroll})
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: "all-data",
          text: "Select All Data",
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...this.state.data.keys()]
            });
          }
        }
      ]
    };

    return (
      <>
        <div className="divSelect">
          <Select
            className="selectTable"
            mode="multiple"
            placeholder="Please select"
            defaultValue={[VARIABLES[0], VARIABLES[1], VARIABLES[2], VARIABLES[3], VARIABLES[4], VARIABLES[5], VARIABLES[6], VARIABLES[7]]}
            maxTagCount={3}
            onChange={this.handleChangeSelected}
          >
            {this.state.children}
          </Select>
        </div>
          <Table
            className="tableComparator"
            scroll={{ x: this.state.sizeScroll }}
            rowSelection={rowSelection} 
            columns={this.state.columns} 
            dataSource={this.state.data}
            pagination={{ pageSize: 4 }}
          />
      </>
    );
  }
}

export default TableModelsComparator;