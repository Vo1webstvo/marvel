import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton";
import {useSelector, useDispatch} from "react-redux";




const CharInfo = () => {
    const {char, status} = useSelector(state => state.charClick);

    const content = status === 'loading' || status === 'error' ? <Skeleton /> :  <View char={char}/>;

    return (
            <div className="char__info">
                {content}
            </div>
    )
}

const View = ({char}) => {
    const { name, description } = char;
    const thumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;
    let imgStyle = { objectFit: 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'contain' };
    }

    return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt="abyss" style={imgStyle} />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href="#" className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description ? description : 'Для данного персонажа описания нет'}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {char.comics.items.length > 0 ? null : 'Для данного персонажа комиксов нету'}
                    {char.comics.items.map((item, i) => {
                            if(i > 9) return;
                        return (
                            <li className="char__comics-item" key={i}>
                                {i+1}. {item.name}
                            </li>
                        )

                    })}

                </ul>
            </>

    )
}

export default CharInfo;