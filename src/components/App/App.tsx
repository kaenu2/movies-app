import React, { Component, JSX } from 'react';

import { Container, MovieList } from '../index';
import MovieService from '../../services/MovieService';
import './App.scss';

import { IState } from './type';

export default class App extends Component<unknown, IState> {
  movieService = new MovieService();

  constructor(props: unknown) {
    super(props);
    this.state = {
      isError: false,
      isLoading: false,
      items: [],
    };
  }

  componentDidMount(): void {
    this.setState({
      isLoading: true,
    });
    this.movieService
      .getMoveList('return', 1)
      .then((data): void => {
        this.setState({
          isLoading: false,
          items: data.results,
        });
      })
      .catch((): void => this.setState({ isError: true, isLoading: true }));
  }

  render(): JSX.Element {
    const { isLoading, isError, items } = this.state;

    return (
      <div className="app">
        <Container>{isLoading ? <h1>Загрузка...</h1> : <MovieList movies={items} isError={isError} />}</Container>
      </div>
    );
  }
}
