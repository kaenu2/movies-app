import React, { Component, JSX } from 'react';

import { MovieItem } from '../index';

export default class MovieList extends Component {
  render(): JSX.Element {
    return (
      <ul>
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
      </ul>
    );
  }
}
