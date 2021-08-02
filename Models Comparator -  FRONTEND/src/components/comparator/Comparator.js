import React, { Component } from "react";

import "../../css/Comparator.css"

import { Bar } from 'react-chartjs-2'
import { Row, Col, Select } from 'antd';

import TableModelsComparator from "./TableModelsComparator"
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
  children.push(<Option key={VARIABLES[11]}>Precio terneros machos</Option>);
  children.push(<Option key={VARIABLES[12]}>Edad servicio vaquillonas</Option>);
  children.push(<Option key={VARIABLES[15]}>Prom. balance preliminar</Option>);

  return children;
}

class Comparator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: initChildren(),
      dataComplexGraphic: {
        labels: [],
        datasets: [{
          label: 'Margen Bruto',
          backgroundColor: "#1890ff",
          yAxisID: 'A',
          data: []
        }, 
        {
          label: 'Prod de carne',
          backgroundColor: "#FF9300",
          yAxisID: 'B',
          data: []
        }]
      },
      optionsComplexGraphic: {
        title: "",
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
            ticks: {
              min: 0
            }
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
              min: 0
            }
          }]
        }
      },
      dataSimpleGraphic:{
        labels: [],
        datasets: [{
          label: 'Vientres a servicio',
          backgroundColor: "#1890ff",
          yAxisID: 'A',
          data: []
        }]
      },
      optionsSimpleGraphic:{
        title: "",
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
            ticks: {
              min: 0
            }
          }]
        }
      },
      dataSimple: [],
      valueGraphicSelected:{ key: VARIABLES[0], label: 'Vientres a servicio' }
    }
  }

  handleChangeValueGraphicSelected = (value) => {
    this.setState( {...this.state, valueGraphicSelected:value} )

    this.setState((prevState) => {
      let dataAux = [];
      let labels = [];
      prevState.dataSimple.forEach(elem => {
        dataAux.push(elem[prevState.valueGraphicSelected.key]);
        labels.push(elem[VARIABLES[21]])
      })
      return {
        ...this.state,
        dataSimpleGraphic: {
          labels: [...labels],
          datasets: [{
            label: prevState.valueGraphicSelected.label,
            backgroundColor: "#1890ff",
            yAxisID: 'A',
            data: [...dataAux]
          }]
        },
        valueGraphicSelected: value
      }
    });
  }

  handleDataSelectedChange = (dataModel) => {
    let labels = []
    let dataMB = []
    let dataPC = []
    let dataSimple = []

    dataModel.forEach(elem => {
      labels.push(elem.modelName);
      dataMB.push(elem.mb_largo_plazo)
      dataPC.push(elem.prod_carne_ha)
      dataSimple.push({
        [VARIABLES[0]]: elem[VARIABLES[0]],
        [VARIABLES[1]]: elem[VARIABLES[1]],
        [VARIABLES[2]]: elem[VARIABLES[2]],
        [VARIABLES[3]]: elem[VARIABLES[3]],
        [VARIABLES[4]]: elem[VARIABLES[4]],
        [VARIABLES[5]]: elem[VARIABLES[5]],
        [VARIABLES[6]]: elem[VARIABLES[6]],
        [VARIABLES[7]]: elem[VARIABLES[7]],
        [VARIABLES[11]]: elem[VARIABLES[11]],
        [VARIABLES[12]]: elem[VARIABLES[12]],
        [VARIABLES[15]]: elem[VARIABLES[15]],
        [VARIABLES[21]]: elem[VARIABLES[21]]
      })
    });

    this.setState((prevState) => {
      let dataAux = [];
      dataSimple.forEach(elem => dataAux.push(elem[prevState.valueGraphicSelected.key]))
      return {
        ...this.state,
        dataComplexGraphic: {
          labels: [...labels],
          datasets: [{
            label: 'Margen Bruto',
            backgroundColor: "#1890ff",
            yAxisID: 'A',
            data: [...dataMB]
          },
          {
            label: 'Prod de carne',
            backgroundColor: "#FF9300",
            yAxisID: 'B',
            data: [...dataPC]
          }] 
        },
        dataSimpleGraphic: {
          labels: [...labels],
          datasets: [{
            label: prevState.valueGraphicSelected.label,
            backgroundColor: "#1890ff",
            yAxisID: 'A',
            data: [...dataAux]
          }]
        },
        dataSimple
      }
    });

  }

  render(){
    return (
      <div>
        <TableModelsComparator
          models = {this.props.models}
          handleDataChange = {(data) => this.handleDataSelectedChange(data)}
        />
        <Row gutter={16}>
          <Col span={12} xs={24} sm={24} md={24} lg={24} xl={12}>
            <h2 className="h2Comparator">Margen Bruto y Prod. de carne</h2>
            <Bar 
              data = {this.state.dataComplexGraphic}
              options = {this.state.optionsComplexGraphic}
            />
          </Col>
          <Col span={12} xs={24} sm={24} md={24} lg={24} xl={12}>
          <>
            <h2 className="h2Comparator">Gráfico de {this.state.valueGraphicSelected.label}</h2>
            <Select
              className="selectComparator"
              labelInValue
              defaultValue={this.state.valueGraphicSelected}
              onChange={this.handleChangeValueGraphicSelected}
            >
              {this.state.children}
            </Select>
            </>
            <Bar
              data = {this.state.dataSimpleGraphic}
              options = {this.state.optionsSimpleGraphic} 
              />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Comparator;