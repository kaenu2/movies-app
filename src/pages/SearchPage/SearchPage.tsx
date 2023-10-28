import React, { Component } from 'react';
import { Alert } from 'antd';

import { AlertError, Loading, MovieList, NetworkError, PaginationParent, SearchInput } from '../../components';

import { IProps } from './type';

export default class SearchPage extends Component<IProps> {
  render() {
    const {
      searchValue,
      onSearchValue,
      totalResults,
      totalPages,
      countPage,
      onCountPage,
      isLoading,
      items,
      isError,
      onAddRating,
      ratedItems,
    } = this.props;

    const loadingRender = isLoading ? <Loading /> : null;
    const errorRender = isError ? (
      <AlertError message="Failed to contact the server, check if VPN is enabled, or try again later." />
    ) : null;
    const errorNotFoundRender =
      !totalResults && searchValue.length && !isError && !isLoading ? (
        <Alert message="Nothing found!" description="Please try changing your search value." type="info" showIcon />
      ) : null;
    const contentRender = !(isLoading || isError) ? (
      <>
        <MovieList movies={items} onAddRating={onAddRating} ratedItems={ratedItems} />
        <PaginationParent
          countPage={countPage}
          onCountPage={onCountPage}
          totalPages={totalPages}
          totalResults={totalResults}
        />
      </>
    ) : null;

    return (
      <div>
        <SearchInput onSearchValue={onSearchValue} value={searchValue} />
        <NetworkError />
        {loadingRender}
        {errorRender}
        {errorNotFoundRender}
        {contentRender}
      </div>
    );
  }
}
