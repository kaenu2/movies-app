import React, { Component } from 'react';
import { Flex } from 'antd';

import './AverRating.scss';

export default class AverRating extends Component<{ popularity: number }> {
  onUpdateColor(value: number): string {
    if (value < 3) return '#E90000';
    if (value < 5) return '#E97E00';
    if (value < 7) return '#E9D100';
    return '#66E900';
  }

  render() {
    const { popularity } = this.props;
    return (
      <div className="aver-rating" style={{ borderColor: this.onUpdateColor(popularity) }}>
        <Flex align="center" justify="center" style={{ width: '100%', height: '100%' }}>
          <span className="aver-rating__value">{popularity.toFixed(1)}</span>
        </Flex>
      </div>
    );
  }
}
