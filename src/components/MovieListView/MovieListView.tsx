import React, { Component } from 'react';

import { MovieItem } from '../index';

import './MovieListView.scss';
import { IProps } from './type';

export default class MovieListView extends Component<IProps> {
  render() {
    const { movies } = this.props;
    return (
      <>
        {movies.map((movie) => {
          const { id, poster_path: srcImg, original_title: name, overview, release_date: releaseDate } = movie;
          return <MovieItem key={id} srcImg={srcImg} name={name} overview={overview} releaseDate={releaseDate} />;
        })}
      </>
    );
  }
}
