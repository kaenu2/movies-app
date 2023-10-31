import React, { Component } from 'react';
import { Alert } from 'antd';

import { IProps } from './type';

import './AlertError.scss';

export default class AlertError extends Component<IProps> {
  render(): JSX.Element {
    const { message } = this.props;
    return (
      <div className="alert-error">
        <Alert message="Error" description={message} type="error" showIcon className="alert-error__message" />
      </div>
    );
  }
}
