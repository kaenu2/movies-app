import React, { Component, JSX } from 'react';

import { MovieItem } from '../index';

import { IProps } from './type';
import './MovieList.scss';

export default class MovieList extends Component<IProps> {
  render(): JSX.Element {
    const { movies, onAddRating, ratedItems } = this.props;

    return (
      <>
        <ul className="movie-list">
          {movies.map((movie) => {
            const {
              id,
              poster_path: srcImg,
              original_title: name,
              overview,
              release_date: releaseDate,
              popularity,
              genre_ids: genreList,
            } = movie;
            const indexRated = ratedItems.findIndex((item) => item.id === id);
            const rating = ratedItems[indexRated] ? ratedItems[indexRated].value : 0;
            return (
              <MovieItem
                key={id}
                srcImg={srcImg}
                name={name}
                id={id}
                overview={overview}
                releaseDate={releaseDate}
                popularity={popularity}
                rating={rating}
                onAddRating={onAddRating}
                genreList={genreList}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
