import React, { Component } from 'react';

import { AlertError } from '../index';

interface IState {
  hisError: boolean;
}
interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export default class ErrorBoundaries extends Component<IProps, IState> {
  state: IState = {
    hisError: false,
  };

  componentDidCatch() {
    this.setState({
      hisError: true,
    });
  }

  render() {
    const { hisError } = this.state;
    if (hisError) {
      return <AlertError message="Something went wrong" />;
    }
    return this.props.children;
  }
}
