import { IMovies } from '../../types/types';
import { IRatedItem } from '../App/type';

export interface IProps {
  movies: IMovies[];
  onAddRating: (id: number, value: number) => void;
  ratedItems: IRatedItem[] | [];
}
