import React, { Component } from 'react';
import { Alert } from 'antd';

import { EMessage, IProps, TMessage } from './type';

import './ParentAlert.scss';

export default class ParentAlert extends Component<IProps> {
  render(): JSX.Element {
    const { message, type, title } = this.props;
    const getMessageTitle = (typeValue: TMessage): string => {
      switch (typeValue) {
        case EMessage.ERROR:
          return 'Error';
        case EMessage.INFO:
          return 'Informational Notes';
        case EMessage.WARNING:
          return 'Warning';
        default:
          return '';
      }
    };
    return (
      <div className="alert-error">
        <Alert
          message={title ? title : getMessageTitle(type)}
          description={message}
          type={type}
          showIcon
          className="alert-error__message"
        />
      </div>
    );
  }
}
