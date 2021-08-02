import React from "react";

import "../../css/Nav.css";

import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

class Nav extends React.Component {
  render() {
    return (
      <Sider className="siderNav">
        <Menu
          className="menuNav"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[this.props.location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">
              <strong>
                <Icon className="iconNav" type="file-text"/>
                Mis modelos
              </strong>
            </Link>
          </Menu.Item>
          <Menu.Item key="/addmodel">
            <Link to="/addmodel">
              <strong>
                <Icon className="iconNav" type="file-add"/>
                Agregar modelo
              </strong>
            </Link>
          </Menu.Item>
          <Menu.Item key="/comparator">
            <Link to="/comparator">
              <strong>
                <Icon className="iconNav" type="bar-chart"/>
                Comparador
              </strong>
            </Link>
          </Menu.Item>

          {this.props.role === "ADMIN" &&
            <Menu.Item key="/users">
              <Link to="/users">
                <strong>
                  <Icon className="iconNav" type="team"/>
                  Usuarios
                </strong>
              </Link>
            </Menu.Item>
          }
          {this.props.role === "ADMIN" &&
            <Menu.Item key="/adduser">
              <Link to="/adduser">
                <strong>
                  <Icon className="iconNav" type="user-add"/>
                  Agregar usuarios
                </strong>
              </Link>
            </Menu.Item>
          }
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon className="iconNav" type="user"/>
                Cuenta
              </span>
            }
          >
            <Menu.Item key="/changepassword" >
              <Link to="/changepassword">
                <Icon className="iconNav" type="lock"/>
                <strong>Cambiar contraseña</strong>
              </Link>
            </Menu.Item>
            <Menu.Item key="/logout" >
              <Link to="/logout">
                <Icon className="iconNav" type="logout"/>
                <strong>Salir</strong>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Nav);
