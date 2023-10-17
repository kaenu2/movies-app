import React, { Component, JSX } from 'react';
import './MovieItem.scss';

export default class MovieItem extends Component {
  render(): JSX.Element {
    const parentClassName = 'movie';
    return (
      <li className={parentClassName}>
        <img src="https://i.ibb.co/zZyJxNM/Rectangle-36.jpg" alt="The way back" width={183} height={281} />
        <div className={parentClassName + '__right'}>
          <h3 className={parentClassName + '__name'}>The way back</h3>
          <p className={parentClassName + '__date'}>March 5, 2020 </p>
          <ul className={parentClassName + '__genres-list genres-list'}>
            <li className="genres-list__item">Action</li>
            <li className="genres-list__item">Drama</li>
          </ul>
          <p className={parentClassName + '__description'}>
            A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
            attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
          </p>
        </div>
      </li>
    );
  }
}
