import React, { Component } from 'react';

import "../../css/ProtectedRoute.css"

import { Redirect } from "react-router-dom"
import { Layout } from 'antd';

import Nav from "../content/Nav";
import Content from "../content/Content"
import Header from "../content/Header"

class ProtectedRoute extends Component {
  render() {
    return (
      <>
        {Object.keys(this.props.currentUser).length === 0 ?
          <Redirect to="/login" />
          :
          <Layout className="layoutProtectedRoute">
            <Header fullname={this.props.currentUser.fullname} />
            <Layout>
              <Nav role={this.props.currentUser.role} />
              <Content />
            </Layout>
          </Layout>
        }
      </>
    );
  }
}

export default ProtectedRoute;
