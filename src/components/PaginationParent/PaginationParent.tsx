import React, { Component, JSX } from 'react';
import { ConfigProvider, Pagination } from 'antd';

import { IProps } from './type';

export default class PaginationParent extends Component<IProps> {
  render(): JSX.Element {
    const { countPage, onCountPage, totalPages, totalResults } = this.props;
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff',
          },
        }}>
        {totalResults > 20 && (
          <div className="pagination">
            <Pagination
              onChange={(page) => onCountPage(page)}
              defaultCurrent={countPage}
              total={totalPages}
              defaultPageSize={20}
            />
          </div>
        )}
      </ConfigProvider>
    );
  }
}
