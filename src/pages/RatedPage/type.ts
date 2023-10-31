import { IRatedMovie } from '../../types/types';
import { IRatedItem } from '../../components/App/type';

export interface IProps {
  items: [] | IRatedMovie[];
  onAddRating: (id: number, value: number) => void;
  isLoading: boolean;
  isError: boolean;
  totalPages: number;
  totalResults: number;
  countPage: number;
  onCountPage: (value: number) => void;
  ratedItems: [] | IRatedItem[];
}
export interface IState {}
