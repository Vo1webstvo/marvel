import React from 'react';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import RandomChar from '../components/randomChar/RandomChar';

const Main = () => {
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList />
        <CharInfo />
      </div>
      <img className="bg-decoration" src="#" alt="vision" />
    </>
  );
};

export default Main;
