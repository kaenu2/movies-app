import { IMovies } from '../../types/types';

export interface IState {
  isError: boolean;
  isLoading: boolean;
  items: [] | IMovies[];
}
