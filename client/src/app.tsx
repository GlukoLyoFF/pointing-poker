import React from 'react';
import style from './app.module.scss';
import { Header } from './components/header/Header';

export const App: React.FC = () => {
  return (
    <div className={style.app}>
      <Header />
    </div>
  );
};
