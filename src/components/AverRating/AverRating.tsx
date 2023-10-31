import React, { Component } from 'react';
import { Flex } from 'antd';

import './AverRating.scss';

export default class AverRating extends Component<{ popularity: number }> {
  onUpdateColor(value: number): string {
    if (value < 3) return 'red';
    if (value < 5) return 'orange';
    if (value < 7) return 'green';
    return 'yellow';
  }

  render() {
    const { popularity } = this.props;
    return (
      <div className={`aver-rating ${this.onUpdateColor(popularity)}`}>
        <Flex align="center" justify="center" className="aver-rating__container">
          <span className="aver-rating__value">{popularity.toFixed(1)}</span>
        </Flex>
      </div>
    );
  }
}
