import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { fetchComicsList } from '../../redux/slices/comicsListSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { addOffsetComics } from '../../redux/slices/comicsListSlice';

const ComicsList = () => {
  const dispatch = useDispatch();
  const { comicsList, status, offset } = useSelector((state) => state.comics);

  useEffect(() => {
    if (!comicsList.length) {
      updateComics(offset);
    }
  }, []);

  const updateComics = (offset) => {
    dispatch(fetchComicsList({ offset }));
    dispatch(addOffsetComics(8));
  };

  const renderItems = (arr) => {
    const visibleElems = arr.map((item) => {
      const thumbnail = item.thumbnail.path + '.' + item.thumbnail.extension;
      return (
        <li className="comics__item" key={item.id}>
          <a href={item.urls[0].url}>
            <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.prices[0].price}$</div>
          </a>
        </li>
      );
    });
    return visibleElems;
  };

  const elems = renderItems(comicsList);
  const errorMessage = status === 'error' ? <ErrorMessage /> : null;
  const spinner = status === 'loading' ? <Spinner /> : null;

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {spinner}
        {errorMessage}
        {elems}
      </ul>
      <button className="button button__main button__long" onClick={() => updateComics(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
