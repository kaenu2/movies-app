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
      isLoading: true,
      items: [],
      compound: true,
    };
  }

  componentDidMount(): void {
    this.setState({ isLoading: true });
    this.movieService
      .getMoveList('return', 1)
      .then((data): void => {
        this.setState({
          isLoading: false,
          items: data.results,
        });
      })
      .catch((): void => this.setState({ isError: true, isLoading: false }));
  }

  onCheckNetwork(value: boolean): void {
    this.setState({
      compound: value,
    });
  }

  render(): JSX.Element {
    const { isLoading, isError, items, compound } = this.state;
    return (
      <div className="app">
        {!compound && <h1>Нет интернета!</h1>}
        <Container>
          <MovieList isLoading={isLoading} movies={items} isError={isError} />
        </Container>
      </div>
    );
  }
}
