import React, { Component, JSX } from 'react';

import { MovieItem } from '../index';
import './MovieList.scss';

export default class MovieList extends Component {
  render(): JSX.Element {
    return (
      <ul className="movie-list">
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
