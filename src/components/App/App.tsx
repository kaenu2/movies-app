import React, { Component, JSX } from 'react';

import { Container, MovieList } from '../index';
import './App.scss';

export default class App extends Component {
  render(): JSX.Element {
    return (
      <div className="app">
        <Container>
          <MovieList />
        </Container>
      </div>
    );
  }
}
