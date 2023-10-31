import React, { Component, JSX } from 'react';
import { Flex, Image, Rate } from 'antd';
import { format } from 'date-fns';

import './MovieItem.scss';
import { AverRating } from '../index';
import { Consumer } from '../Context/Context';
import { IGenre } from '../../services/type';

import { IProps } from './type';

export default class MovieItem extends Component<IProps> {
  checkImageUrl(url: string): string {
    if (url) {
      return 'https://image.tmdb.org/t/p/original/' + url;
    }
    return 'https://i.ibb.co/XDzV9Wy/noimage.jpg';
  }

  croppingText(value: string, charactersLength: number): string {
    if (!value) return 'No description';
    if (value.length <= charactersLength) return value;

    let countLength = 0;
    const newArr = [];
    const valueSplit = value.split(' ');
    for (let i = 0; i < valueSplit.length; i++) {
      const el = valueSplit[i];
      if (countLength < charactersLength) {
        countLength += el.length;
        newArr.push(el);
      }
    }
    return newArr.join(' ') + '...';
  }

  formattingDate(date: string): string {
    if (!date) return 'Date unknown';
    const newArr: number[] = date.split('-').map((el) => Number(el));
    const year = newArr[0];
    const month = newArr[1];
    const day = newArr[1];
    return format(new Date(year, month, day), 'PP');
  }

  onCreateGenreItem(id: number, genreList: IGenre[]): IGenre {
    return genreList.filter((genre) => genre.id === id)[0];
  }

  render(): JSX.Element {
    const { srcImg, name, overview, releaseDate, popularity, id, onAddRating, rating, genreList } = this.props;
    return (
      <li className="movie">
        <div className="movie__img">
          <Image src={this.checkImageUrl(srcImg)} alt={name} width="inherit" height="inherit" />
        </div>
        <Flex justify="space-between" gap="middle" className="movie__top">
          <h3 className="movie__name">{name}</h3>
          <AverRating popularity={popularity} />
        </Flex>
        <p className="movie__date">{this.formattingDate(releaseDate)}</p>
        {
          <Flex component={'ul'} wrap="wrap" className="movie__genres genres">
            <Consumer>
              {(value) => {
                if (!genreList.length) {
                  return <li className="genres__item">no genre</li>;
                }
                return genreList.map((genre) => {
                  return (
                    <li key={genre} className="genres__item">
                      {this.onCreateGenreItem(genre, value).name}
                    </li>
                  );
                });
              }}
            </Consumer>
          </Flex>
        }
        <p className="movie__descr">{this.croppingText(overview, 140)}</p>
        <Rate
          defaultValue={rating}
          count={10}
          allowHalf
          allowClear={false}
          onChange={(count) => onAddRating(id, count)}
          className="movie__rate"
        />
      </li>
    );
  }
}
