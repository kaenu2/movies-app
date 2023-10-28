import React, { Component } from 'react';
import { Alert } from 'antd';
import { Offline } from 'react-detect-offline';

export default class NetworkError extends Component {
  render() {
    return (
      <Offline>
        <Alert message="Warning" description="This is a warning notice about copywriting." type="warning" showIcon />
      </Offline>
    );
  }
}
