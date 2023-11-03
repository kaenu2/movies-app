import React, { Component } from 'react';
import { Offline } from 'react-detect-offline';

import { ParentAlert } from '../index';

export default class NetworkError extends Component {
  render() {
    return (
      <Offline>
        <ParentAlert message="This is a warning notice about copywriting." type="warning" />
      </Offline>
    );
  }
}
