import React, { Component, JSX } from 'react';
import { ConfigProvider } from 'antd';

import { IProps } from './type';

export default class StyleSettingsAntd extends Component<IProps> {
  render(): JSX.Element {
    const { children } = this.props;
    return (
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
            },
          },
        }}>
        {children}
      </ConfigProvider>
    );
  }
}
