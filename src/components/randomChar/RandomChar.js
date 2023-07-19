import { useSelector, useDispatch } from 'react-redux';
import { fetchCharId } from '../../redux/slices/charSlices';
import { useEffect } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
  const { oneChar, status } = useSelector((state) => state.charDb);
  const dispatch = useDispatch();

  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
    dispatch(fetchCharId({ id }));
  };

  const errorMessage = status === 'error' ? <ErrorMessage /> : null;
  const spinner = status === 'loading' ? <Spinner /> : null;
  const content = !(status === 'loading' || status === 'error' || !oneChar) ? (
    <View oneChar={oneChar} />
  ) : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ oneChar }) => {
  const { name, description } = oneChar;
  const thumbnail = oneChar.thumbnail.path + '.' + oneChar.thumbnail.extension;
  let imgStyle = { objectFit: 'cover' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { objectFit: 'contain' };
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description ? description.slice(0, 210) : 'Описания нет'}
        </p>
        <div className="randomchar__btns">
          <a href={oneChar.urls[0].url} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={oneChar.urls[1].url} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;