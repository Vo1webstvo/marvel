import { useGetComicsQuery } from '../../redux/api.ts';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner.tsx';
import ErrorMessage from '../errorMessage/ErrorMessage.tsx';
import './comicsList.scss';

const ComicsList: React.FC = () => {
  const [limit, setLimit] = useState<number>(8);
  const { data, isError, isLoading, isFetching } = useGetComicsQuery(limit);

  const updateComicsList = () => {
    setLimit(limit + 8);
  };

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {isLoading ? <Spinner /> : null}
        {isError ? <ErrorMessage /> : null}
        {data &&
          data.map((item) => {
            return (
              <li className="comics__item" key={item.id}>
                <Link to={`/comics/${item.id}`}>
                  <img src={item.thumbnailPath} alt="ultimate war" className="comics__item-img" />
                  <div className="comics__item-name">{item.title}</div>
                  <div className="comics__item-price">{item.pricePath}</div>
                </Link>
              </li>
            );
          })}
      </ul>
      <button
        className={`button button__main button__long ${isFetching ? 'disabled' : ''}`}
        onClick={() => updateComicsList()}
        disabled={isFetching}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
