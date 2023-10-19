import React, { Component, JSX } from 'react';
import { Image } from 'antd';
import { format } from 'date-fns';

import './MovieItem.scss';
import { IProps } from './type';

export default class MovieItem extends Component<IProps> {
  checkImageUrl(url: string): string {
    if (url) {
      return 'https://image.tmdb.org/t/p/original/' + url;
    }
    return 'https://i.ibb.co/XDzV9Wy/noimage.jpg';
  }

  croppingText(value: string, charactersLength: number): string {
    if (!value) return '';
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
    if (!date) return '';
    const newArr: number[] = date.split('-').map((el) => Number(el));
    const year = newArr[0];
    const month = newArr[1];
    const day = newArr[1];
    return format(new Date(year, month, day), 'PP');
  }

  render(): JSX.Element {
    const parentClassName = 'movie';
    const { srcImg, name, overview, releaseDate } = this.props;
    return (
      <li className={parentClassName}>
        <div className={parentClassName + '__img'}>
          <Image src={this.checkImageUrl(srcImg)} alt={name} width="inherit" height="inherit" />
        </div>
        <div className={parentClassName + '__right'}>
          <h3 className={parentClassName + '__name'}>{name}</h3>
          <p className={parentClassName + '__date'}>{this.formattingDate(releaseDate)}</p>
          <ul className={parentClassName + '__genres-list genres-list'}>
            <li className="genres-list__item">Action</li>
            <li className="genres-list__item">Drama</li>
          </ul>
          <p className={parentClassName + '__description'}>{this.croppingText(overview, 180)}</p>
        </div>
      </li>
    );
  }
}
