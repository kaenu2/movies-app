import { IMovies } from '../types/types';

export interface IGetResource {
  page: number;
  results: IMovies[];
}

export interface IGetMoveList {
  page: number;
  results: IMovies[];
}
