import { IMovies, IRatedMovie } from '../../types/types';

export interface IProps {
  items: [] | IRatedMovie[];
  onAddRating: (id: number, value: number) => void;
  isLoading: boolean;
  isError: boolean;
}
export interface IState {}
