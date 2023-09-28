import { useEffect } from 'react';
import { fetcRandomhUserById } from '../../redux/slice/randomCharSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { IResult } from '../../type/iOneChar.ts';

import Spinner from '../spinner/Spinner.tsx';
import ErrorMessage from './../errorMessage/ErrorMessage';

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

const RandomChar: React.FC = () => {
  const { charRandom, status } = useAppSelector((state) => state.randomChar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRandomCharForClick();
  }, []);

  const getRandomCharForClick = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
    dispatch(fetcRandomhUserById(id));
  };

  const loading = status === 'loading' ? <Spinner /> : null;
  const err = status === 'error' ? <ErrorMessage /> : null;
  const items = !loading && !err && charRandom ? <VIew charRandomProps={charRandom} /> : null;

  return (
    <div className="randomchar">
      {loading}
      {err}
      {items}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className={`button button__main ${status === 'loading' ? 'disabled' : ''}`}
          disabled={status === 'loading'}
          onClick={getRandomCharForClick}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

interface ViewProps {
  charRandomProps: IResult;
}

const VIew: React.FC<ViewProps> = ({ charRandomProps }) => {
  let imgStyle: React.CSSProperties = { objectFit: 'cover' };
  if (
    charRandomProps.thumbnailPath ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'contain' };
  }
  return (
    <div className="randomchar__block">
      <img
        src={charRandomProps.thumbnailPath}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{charRandomProps?.name}</p>
        <p className="randomchar__descr">{charRandomProps?.description}</p>
        <div className="randomchar__btns">
          <a href={charRandomProps.homepagePath} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={charRandomProps.wikiPath} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
