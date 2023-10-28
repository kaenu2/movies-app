export interface IProps {
  srcImg: string;
  name: string;
  overview: string;
  releaseDate: string;
  popularity: number;
  id: number;
  rating: number;
  onAddRating: (id: number, value: number) => void;
  genreList: number[];
}
