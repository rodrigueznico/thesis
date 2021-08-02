import React from "react";

import "../../css/Content.css"

import { Layout } from "antd";

import Routers from "../routers/Routers";

const { Content } = Layout;

class Contents extends React.Component {
  render() {
    return (
      <Layout className="layoutContent">
        <Content className="generalContent">
          <Routers/>
        </Content>
      </Layout>
    );
  }
}

export default Contents;
