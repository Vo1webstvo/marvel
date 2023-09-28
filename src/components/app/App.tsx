import AppHeader from '../appHeader/AppHeader';
import Home from '../../pages/Home.tsx';
import ComicsList from '../comicsList/ComicsList.tsx';
import SingleComic from '../singleComic/SingleComic.tsx';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<ComicsList />} />
        <Route path="/comics/:id" element={<SingleComic />} />
      </Routes>
    </div>
  );
};

export default App;
