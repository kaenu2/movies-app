export interface IProps {
  countPage: number;
  onCountPage: (value: number) => void;
  totalPages: number;
  totalResults: number;
}
