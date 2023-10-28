import React, { Component } from 'react';
import { Alert } from 'antd';

import { IProps } from './type';

export default class AlertError extends Component<IProps> {
  render(): JSX.Element {
    const { message } = this.props;
    return (
      <div>
        <Alert
          message="Error"
          description={message}
          type="error"
          showIcon
          style={{ width: '100%', minWidth: '100%' }}
        />
      </div>
    );
  }
}
