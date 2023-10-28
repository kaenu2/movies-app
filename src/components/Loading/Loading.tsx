import React, { Component, JSX } from 'react';
import { Spin } from 'antd';

import './Loading.scss';

export default class Loading extends Component {
  render(): JSX.Element {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }
}
