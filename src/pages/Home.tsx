import React from 'react';
import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import decoration from '../resources/img/vision.png';

const Home: React.FC = () => {
  return (
    <main>
      <RandomChar />
      <div className="char__content">
        <CharList />
        <CharInfo />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </main>
  );
};

export default Home;
