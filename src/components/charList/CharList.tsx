import { useAppDispatch } from '../../redux/hook';
import { useState } from 'react';
import { useGetCharListQuery } from '../../redux/api';
import { getIdComics } from '../../redux/slice/randomCharSlice';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList: React.FC = () => {
  const [offset, setOffset] = useState<number>(210);
  const [limit, setLimit] = useState<number>(9);
  const { data, isLoading, isError, isFetching } = useGetCharListQuery({ offset, limit });
  const dispath = useAppDispatch();

  const getCharIdForClick = (id: number) => {
    dispath(getIdComics(id));
  };

  return (
    <div className="char__list">
      <ul className="char__grid">
        {isLoading ? <Spinner /> : null}
        {isError ? <ErrorMessage /> : null}

        {data &&
          data.map((item) => {
            let imgStyle: React.CSSProperties = { objectFit: 'cover' };
            if (
              item.thumbnailPath ===
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
              imgStyle = { objectFit: 'contain' };
            }
            return (
              <li className="char__item" key={item.id} onClick={() => getCharIdForClick(item.id)}>
                <img src={item.thumbnailPath} alt="abyss" style={imgStyle} />
                <div className="char__name">{item.name}</div>
              </li>
            );
          })}
      </ul>
      <button
        className={`button button__main button__long ${isFetching ? 'disabled' : ''}`}
        disabled={isFetching}
        onClick={() => setLimit((limit) => limit + 9)}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
