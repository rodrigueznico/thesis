import React from 'react';

import "../../css/ModelDetails.css"
import 'antd/dist/antd.css';

import { Drawer, Col, Row } from 'antd';

const DescriptionItem = ({ title, content }) => (
  <div className="divModelDetails">
    <p className="paragraphModelDetails">
      {title}:
    </p>
    {content}
  </div>
);

class ModelDetails extends React.Component {
  render() {
    const { model } = this.props;
    return (
        <Drawer
          width={640}
          placement="right"
          title="Detalle del Modelo"
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <Row>
            <Col span={12}>
              <DescriptionItem title="Vientres a servicio" content={model[0].modelData.vientre_servicio} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Tasa de preñez" content={model[0].modelData.tasa_prenez} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Has. ganaderas efectivas" content={model[0].modelData.has_ganaderas_afectivas} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Prod. de carne/ha" content={model[0].modelData.prod_carne_ha} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="M.B. largo plazo" content={model[0].modelData.mb_largo_plazo} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Ingreso neto/ha" content={model[0].modelData.ingreso_neto_ha} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Gastos directos/ha" content={model[0].modelData.gastos_directos_ha} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Costos directos/ha" content={model[0].modelData.costos_directos_hs} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Prod. de carne/racion prod." content={model[0].modelData.prod_carne_racion} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Prod. de carne/EV" content={model[0].modelData.prod_carne_ev} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Carga EV/HA" content={model[0].modelData.carga_ev_ha} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Precio terneros machos" content={model[0].modelData.precio_terneros_machos} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Edad servicio vaquillonas" content={model[0].modelData.edad_servicio_vaquillonas} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Prom. diario req." content={model[0].modelData.prom_diario_req} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Prom. diario oferta" content={model[0].modelData.prom_diario_oferta} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Prom. diario balance preliminar" content={model[0].modelData.prom_diario_balance_preliminar} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Receptividad racion/ha" content={model[0].modelData.receptividad_racion_ha} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Dist. preñez vacas" content={model[0].modelData.dist_prenez_vacas} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Dist. preñez vaq." content={model[0].modelData.dist_prenez_vaquillonas} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Cantidad vacas" content={model[0].modelData.cant_vacas} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Cantidad vaquillonas" content={model[0].modelData.cant_vaquillonas} />
            </Col>
          </Row>
        </Drawer>
    );
  }
}

export default ModelDetails;