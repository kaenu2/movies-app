import React, { Component, JSX } from 'react';

import { IProps } from './type';

import './Container.scss';

export default class Container extends Component<IProps> {
  render(): JSX.Element {
    const { children }: IProps = this.props;
    return <div className="container">{children}</div>;
  }
}
