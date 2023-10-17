import React, { Component, JSX } from 'react';

export default class MovieItem extends Component {
  render(): JSX.Element {
    return (
      <li>
        <img src="" alt="" />
        <div>
          <h3>The way back</h3>
          <p>March 5, 2020 </p>
          <ul>
            <li>Action</li>
            <li>Drama</li>
          </ul>
          <p>
            A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
            attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
          </p>
        </div>
      </li>
    );
  }
}
