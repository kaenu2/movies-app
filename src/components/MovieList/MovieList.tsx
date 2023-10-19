import React, { Component, JSX } from 'react';

import { MovieItem } from '../index';

import './MovieList.scss';
import { IProps } from './type';

export default class MovieList extends Component<IProps> {
  render(): JSX.Element {
    const { movies, isError } = this.props;
    return (
      <ul className="movie-list">
        {isError ? (
          <h2>Error...</h2>
        ) : (
          movies.map((movie) => {
            const { id, poster_path: srcImg, original_title: name, overview, release_date: releaseDate } = movie;
            return <MovieItem key={id} srcImg={srcImg} name={name} overview={overview} releaseDate={releaseDate} />;
          })
        )}
      </ul>
    );
  }
}
