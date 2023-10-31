import { IMovies, IRatedMovie } from '../../types/types';
import { IGenre } from '../../services/type';

export interface IState {
  isError: boolean;
  isLoading: boolean;
  items: [] | IMovies[];
  searchValue: string;
  countPage: number;
  totalPages: number;
  totalResults: number;
  ratedItems: [] | IRatedMovie[];
  activeTab: string;

  isLoadingRated: boolean;
  isErrorRated: boolean;
  totalPagesRated: number;
  countPageRated: number;
  totalResultsRated: number;
  allRatedList: [] | IRatedItem[];

  genres: [] | IGenre[];
}

export interface IRatedItem {
  id: number;
  value: number;
}
