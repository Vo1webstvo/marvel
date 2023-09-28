import React from 'react';
import { useAppSelector } from '../../redux/hook';
import { useGetOneCharQuery } from '../../redux/api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IResult } from '../../type/iOneChar';

import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


const CharInfo: React.FC = () => {
  const { idChar } = useAppSelector((state) => state.randomChar);
  const { data} = useGetOneCharQuery(idChar ? idChar : skipToken);

  interface ViewProps {
    data: IResult;
  }

  const View: React.FC<ViewProps> = ({ data }) => {
    let imgStyle: React.CSSProperties = { objectFit: 'cover' };
    if (
      data.thumbnailPath === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
      imgStyle = { objectFit: 'contain' };
    }
    return (
      <>
        <div className="char__basics">
          <img src={data.thumbnailPath} alt="abyss" style={imgStyle} />
          <div>
            <div className="char__info-name">{data.name}</div>
            <div className="char__btns">
              <a href={data.homepagePath} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={data.wikiPath} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{data.description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {!data.comicsPath.length ? <span>Комиксов нет</span> : null}
          {data.comicsPath.map((item: any, i: number) => {
            return (
              <li className="char__comics-item" key={i}>
                {i + 1}. {item.name}
              </li>
            );
          })}
        </ul>
      </>
    );
  };
  const skel = !data ? <Skeleton /> : <View data={data} />;

  return <div className="char__info">{skel}</div>;
};

export default CharInfo;
