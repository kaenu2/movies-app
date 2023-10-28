import { IMovies, IRatedMovie } from '../../types/types';

export interface IProps {
  movies: IMovies[];
  onAddRating: (id: number, value: number) => void;
  ratedItems: IRatedMovie[] | [];
}
