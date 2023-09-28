import { useParams } from 'react-router-dom';
import { useGetOneComicQuery } from '../../redux/api';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/Routes';

import './singleComic.scss';

const SingleComic: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetOneComicQuery(+id!);
  return (
    <div className="single-comic">
      <img src={data?.thumbnailPath} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{data?.title}</h2>
        <p className="single-comic__descr">{data?.description}</p>
        <p className="single-comic__descr">{data?.pageCount}</p>
        <p className="single-comic__descr">{data?.pageCount}</p>
        <div className="single-comic__price">{data?.pricePath}</div>
      </div>
      <Link to={ROUTES.comics} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComic;
