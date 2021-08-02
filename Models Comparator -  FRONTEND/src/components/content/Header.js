import React from "react";

import "../../css/Header.css";

import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

class HeaderApp extends React.Component {
  render() {
    return (
      <Header className="header">
        <div className="logo">
          {this.props.fullname}
        </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" className="menuItem">
            <Link to="/logout">
            <Icon type="logout" className="iconHeader"/><strong>Salir</strong>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default HeaderApp;
