import React, { Component } from 'react';
import { Input } from 'antd';

import { IProps, IState } from './type';

export default class SearchInput extends Component<IProps, IState> {
  state: IState = {
    value: '',
  };

  onChangeValue(e: React.ChangeEvent<HTMLInputElement>): void {
    const targetValue = e.target.value;
    const { onSearchValue, value } = this.props;
    this.setState({ value: targetValue });
    if (!targetValue || !targetValue.trim() || targetValue.toLowerCase().trim() === value) return;
    onSearchValue(targetValue);
  }

  render() {
    return (
      <div className="search">
        <Input
          placeholder="Type to search..."
          value={this.state.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeValue(e)}
        />
      </div>
    );
  }
}
