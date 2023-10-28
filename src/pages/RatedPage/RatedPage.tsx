import React, { Component } from 'react';
import { Alert } from 'antd';

import { AlertError, Loading, MovieList } from '../../components';

import { IProps, IState } from './type';

export default class RatedPage extends Component<IProps, IState> {
  render() {
    const { onAddRating, items, isError, isLoading } = this.props;

    const loadingRender = isLoading ? <Loading /> : null;
    const errorRender = isError ? (
      <AlertError message="Failed to contact the server, check if VPN is enabled, or try again later." />
    ) : null;
    const errorNotFoundRender =
      !items.length && !isError && !isLoading ? (
        <Alert message="Nothing found!" description="You haven't rated the movie yet." type="info" showIcon />
      ) : null;
    const contentRender = !(isLoading || isError) ? (
      <>
        <MovieList movies={items} onAddRating={onAddRating} ratedItems={items} />
      </>
    ) : null;

    return (
      <>
        {loadingRender}
        {errorRender}
        {errorNotFoundRender}
        {contentRender}
      </>
    );
  }
}
