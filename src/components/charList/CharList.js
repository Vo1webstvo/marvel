import './charList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCharList } from '../../redux/slices/charListSlice';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { fetchCharForClick } from '../../redux/slices/clickCharSlice';
import { clearCharList, addOffset } from '../../redux/slices/charListSlice';

const CharList = () => {
  const dispatch = useDispatch();
  const { offset, charList, status } = useSelector((state) => state.charListDb);
  // const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);

  useEffect(() => {
    // Clear the charList state when the component first mounts
    //можно сделать при переходе на другую страницу и обратно, чтоб снова показывались первые персонажи, сейчас оно будет запоминаться
    // dispatch(clearCharList());

    if (!charList.length) {
      updateCharList(offset);
    }

    // eslint-disable-next-line
  }, []);

  const updateCharList = (offset) => {
    dispatch(fetchCharList({ offset }));
    dispatch(addOffset(9));
    setNewItemLoading(false);
  };

  const liElems = (arr) => {
    const items = arr.map((item) => {
      const thumbnail = item.thumbnail.path + '.' + item.thumbnail.extension;
      const { id } = item;
      let imgStyle = { objectFit: 'cover' };
      if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'contain' };
      }
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => dispatch(fetchCharForClick({ id }))}>
          <img src={thumbnail} alt="abyss" style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const items = liElems(charList);
  const errorMessage = status === 'error' ? <ErrorMessage /> : null;
  const spinner = status === 'loading' && newItemLoading ? <Spinner /> : null;

  // const loading = status === 'loading' && newItemLoading ? <Spinner /> : null;
  // const err = status === 'error' ? <ErrorMessage /> : null;
  // const content = !(status === 'loading' || status === 'error' || !charList) ? liElems : null; если буду использовать это для рендера li, то при нажатии на кнопку Load More идет спинер и дозагрузка персонажей

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button className="button button__main button__long">
        <div className="inner" onClick={() => updateCharList(offset)}>
          load more
        </div>
      </button>
    </div>
  );
};

// const View =  ({charList}) => {
//     const vieElems = charList.map(item => {
//         const thumbnail = item.thumbnail.path + '.' + item.thumbnail.extension;
//         let imgStyle = { objectFit: 'cover' };
//         if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//             imgStyle = { objectFit: 'contain' };
//         }
//
//         return (
//             <li className="char__item" key={item.id}>
//                 <img src={thumbnail} alt="abyss"
//                 style={imgStyle}/>
//                 <div className="char__name">{item.name}</div>
//             </li>
//         )
//     });
//     return vieElems;
// }

export default CharList;
