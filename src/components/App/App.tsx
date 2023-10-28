import React, { Component, JSX } from 'react';
import { debounce } from 'lodash';
import { Tabs } from 'antd';

import MovieService from '../../services/MovieService';
import './App.scss';
import { Container, StyleSettingsAntd } from '../index';
import { IGetMoveList } from '../../services/type';
import { RatedPage, SearchPage } from '../../pages';
import { Provider } from '../Context/Context';

import { IState } from './type';

export default class App extends Component<unknown, IState> {
  movieService = new MovieService();

  state: IState = {
    isError: false,
    isLoading: false,
    items: [],
    searchValue: '',
    countPage: 1,
    totalPages: 0,
    totalResults: 0,
    activeTab: '1',
    //
    isLoadingRated: false,
    isErrorRated: false,
    ratedItems: [],

    genres: [],
  };

  componentDidMount() {
    this.movieService.createGuestSession().catch(() => this.setState({ isErrorRated: true }));
    this.movieService
      .getGenreList()
      .then((data) => this.setState({ genres: data.genres }))
      .catch();
  }

  componentDidUpdate(prevProps: Readonly<unknown>, prevState: Readonly<IState>): void {
    if (prevState.searchValue !== this.state.searchValue || prevState.countPage !== this.state.countPage) {
      this.onSearchMovies(this.state.countPage, this.state.searchValue);
    }
    if (prevState.activeTab !== this.state.activeTab) {
      this.onSearchMovies(this.state.countPage, this.state.searchValue);
      this.setState({ isLoadingRated: true });
      this.movieService
        .getRatedList()
        .then(({ results }) =>
          this.setState({
            isLoadingRated: false,
            ratedItems: results,
          })
        )
        .catch(() => this.setState({ isErrorRated: false, isLoadingRated: false }));
    }
  }

  onSearchMovies(page: number, searchValue: string): void {
    this.setState({ isLoading: true, items: [], isError: false });
    this.movieService
      .getMoveList(searchValue, page)
      .then((data: IGetMoveList): void => {
        const { total_pages: totalPages, results, total_results: totalResults } = data;
        this.setState({
          isLoading: false,
          items: results,
          totalPages,
          totalResults,
        });
      })
      .catch((): void => {
        this.setState({ isError: true, isLoading: false });
      });
  }

  onCountPage = (value: number): void => {
    this.setState({ countPage: value });
  };

  onSearchValue = debounce((value: string): void => {
    this.setState({ searchValue: value.toLowerCase().trim() });
  }, 400);

  onAddRating = (id: number, value: number) => {
    this.movieService
      .addRating(id, value)
      .then((data) => data)
      .catch(() => {
        throw new Error('');
      });
  };

  render(): JSX.Element {
    const {
      isLoading,
      isError,
      items,
      countPage,
      totalPages,
      searchValue,
      totalResults,
      ratedItems,
      isLoadingRated,
      isErrorRated,
      genres,
    } = this.state;
    const itemsTabs = [
      {
        key: '1',
        label: 'Search',
        children: (
          <SearchPage
            isLoading={isLoading}
            items={items}
            isError={isError}
            countPage={countPage}
            onCountPage={this.onCountPage}
            totalPages={totalPages}
            onSearchValue={this.onSearchValue}
            searchValue={searchValue}
            totalResults={totalResults}
            onAddRating={this.onAddRating}
            ratedItems={ratedItems}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <RatedPage
            isError={isErrorRated}
            isLoading={isLoadingRated}
            items={ratedItems}
            onAddRating={this.onAddRating}
          />
        ),
      },
    ];
    return (
      <div className="app">
        <Provider value={genres}>
          <Container>
            <StyleSettingsAntd>
              <Tabs
                defaultActiveKey="1"
                items={itemsTabs}
                size="large"
                centered
                onChange={(key) => this.setState({ activeTab: key })}
              />
            </StyleSettingsAntd>
          </Container>
        </Provider>
      </div>
    );
  }
}
