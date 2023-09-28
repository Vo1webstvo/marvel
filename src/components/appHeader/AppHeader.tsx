import {  NavLink } from 'react-router-dom';

import './appHeader.scss';
import { ROUTES } from '../../utils/Routes';

const AppHeader: React.FC = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <NavLink className={({isActive}) => isActive ? 'active-link': ''} to={ROUTES.home}>
          <span>Marvel</span> information portal
        </NavLink>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink className={({isActive}) => isActive ? 'active-link': ''} to={ROUTES.home}>Characters</NavLink>
          </li>
          /
          <li>
            <NavLink className={({isActive}) => isActive ? 'active-link': ''} to={ROUTES.comics}>Comics</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
