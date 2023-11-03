import React, { Component, JSX } from 'react';
import { debounce } from 'lodash';
import { Tabs } from 'antd';

import MovieService from '../../services/MovieService';
import './App.scss';
import { Container, ErrorBoundaries, StyleSettingsAntd } from '../index';
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
    totalPagesRated: 0,
    countPageRated: 1,
    totalResultsRated: 0,
    allRatedList: [],
    //
    genres: [],
  };

  componentDidMount() {
    document.cookie = 'api_key=; max-age=-1';
    this.movieService.createGuestSession().catch(() => this.setState({ isErrorRated: true }));
    this.movieService
      .getGenreList()
      .then((data) => this.setState({ genres: data.genres }))
      .catch(() => this.setState({ isError: true, isLoading: false }));
    if (sessionStorage.getItem('session-id')) {
      this.movieService
        .getRatedList(this.state.countPageRated)
        .then(({ results, total_results: totalResultsRated, total_pages: totalPagesRated }) =>
          this.setState({
            isLoadingRated: false,
            ratedItems: results,
            totalPagesRated,
            totalResultsRated,
          })
        )
        .catch(() => this.setState({ isErrorRated: false, isLoadingRated: false }));
    }
  }

  componentDidUpdate(prevProps: Readonly<unknown>, prevState: Readonly<IState>): void {
    if (prevState.searchValue !== this.state.searchValue || prevState.countPage !== this.state.countPage) {
      this.onSearchMovies(this.state.countPage, this.state.searchValue);
    }
    if (prevState.activeTab !== this.state.activeTab || prevState.countPageRated !== this.state.countPageRated) {
      this.onSearchMovies(this.state.countPage, this.state.searchValue);
      this.setState({ isLoadingRated: true });
      this.movieService
        .getRatedList(this.state.countPageRated)
        .then(({ results, total_results: totalResultsRated, total_pages: totalPagesRated }) => {
          if (!results.length) {
            this.setState({ allRatedList: [] });
          }
          this.setState({
            isLoadingRated: false,
            ratedItems: results,
            totalPagesRated,
            totalResultsRated,
          });
        })
        .catch(() => this.setState({ isErrorRated: false, isLoadingRated: false }));
    }
    if (this.movieService.getCookie('api_key') === null && this.state.allRatedList.length) {
      this.movieService.createGuestSession().catch(() => this.setState({ isErrorRated: true }));
      this.setState({ allRatedList: [] });
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

  onCountPageRated = (value: number): void => {
    this.setState({ countPageRated: value });
  };

  onSearchValue = debounce((value: string): void => {
    this.setState({ searchValue: value.toLowerCase().trim() });
  }, 400);

  onAddRating = (id: number, value: number) => {
    const cookieValue = this.movieService.getCookie('api_key');
    document.cookie = `api_key=${cookieValue}; max-age=3000`;
    this.movieService
      .addRating(id, value)
      .then(() => {
        this.setState(({ allRatedList }) => {
          const findIndex = allRatedList.findIndex((el) => el.id === id);
          if (findIndex !== -1) {
            const oldItem = allRatedList[findIndex];
            const newArr = [
              ...allRatedList.slice(0, findIndex),
              { ...oldItem, value },
              ...allRatedList.slice(findIndex + 1),
            ];
            return { allRatedList: newArr };
          } else {
            return {
              allRatedList: [...allRatedList, { id, value }],
            };
          }
        });
      })
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
      totalPagesRated,
      totalResultsRated,
      countPageRated,
      allRatedList,
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
            ratedItems={allRatedList}
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
            totalPages={totalPagesRated}
            totalResults={totalResultsRated}
            countPage={countPageRated}
            onCountPage={this.onCountPageRated}
            ratedItems={allRatedList}
          />
        ),
      },
    ];
    return (
      <div className="app">
        <ErrorBoundaries>
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
        </ErrorBoundaries>
      </div>
    );
  }
}
