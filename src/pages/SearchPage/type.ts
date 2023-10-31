import { IMovies } from '../../types/types';
import { IRatedItem } from '../../components/App/type';

export interface IProps {
  isLoading: boolean;
  items: [] | IMovies[];
  isError: boolean;
  countPage: number;
  onCountPage: (value: number) => void;
  totalPages: number;
  searchValue: string;
  onSearchValue: (value: string) => void;
  totalResults: number;
  onAddRating: (id: number, value: number) => void;
  ratedItems: IRatedItem[] | [];
}
