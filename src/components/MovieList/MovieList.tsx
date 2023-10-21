import React, { Component, JSX } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Alert, Spin } from 'antd';

import { MovieListView } from '../index';

import { IProps } from './type';

export default class MovieList extends Component<IProps> {
  render(): JSX.Element {
    const { movies, isError, isLoading } = this.props;
    const hasMovies = !(isLoading || isError);
    const errorMessage: JSX.Element | null = isError ? (
      <Alert
        message="Error"
        description="Failed to contact the server, check if VPN is enabled, or try again later."
        type="error"
        showIcon
        style={{ width: '100%', minWidth: '100%' }}
      />
    ) : null;
    const loading: JSX.Element | null = isLoading ? <Spin size="large" /> : null;
    const content: JSX.Element | null = hasMovies ? <MovieListView movies={movies} /> : null;
    return (
      <>
        <Online>
          <ul className="movie-list">
            {loading}
            {errorMessage}
            {content}
          </ul>
        </Online>
        <Offline>
          <Alert message="Error" description="Network error." type="error" showIcon style={{ width: '100%' }} />
        </Offline>
      </>
    );
  }
}
