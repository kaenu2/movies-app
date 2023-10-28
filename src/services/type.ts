import { IMovies, IRatedMovie } from '../types/types';

export interface IGetMoveList {
  page: number;
  results: IMovies[];
  total_pages: number;
  total_results: number;
}
export interface IGetRatedMoveList {
  page: number;
  results: IRatedMovie[];
  total_pages: number;
  total_results: number;
}
export interface ICreateSessionGuest {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreList {
  genres: IGenre[];
}
