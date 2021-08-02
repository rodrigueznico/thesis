import React, { Component } from "react";

import { Result } from 'antd';

class NotFound extends Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="La página que visitaste no existe."
      />
    );
  }
}

export default NotFound;