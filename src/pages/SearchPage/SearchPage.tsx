import React, { Component } from 'react';

import { ParentAlert, Loading, MovieList, NetworkError, PaginationParent, SearchInput } from '../../components';

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
      <ParentAlert message="Failed to contact the server, check if VPN is enabled, or try again later." type="error" />
    ) : null;
    const errorNotFoundRender =
      !totalResults && searchValue.length && !isError && !isLoading ? (
        <ParentAlert message="Please try changing your search value." type="info" title="Not found" />
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
