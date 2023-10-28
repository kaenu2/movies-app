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

  genres: [] | IGenre[];
}
