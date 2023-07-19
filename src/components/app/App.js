import AppHeader from '../appHeader/AppHeader';
import Main from '../../pages/main';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ComicsList from '../comicsList/ComicsList';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route exact path="/" element={<Main />} />

            <Route exact path="/comics" element={<ComicsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
