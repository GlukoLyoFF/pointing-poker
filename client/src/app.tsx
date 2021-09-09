import React from 'react';
import style from './app.module.scss';
import { Routing } from './components/routing/Routing';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';

export const App: React.FC = () => {
  return (
    <div className={style.app}>
      <Header />
      <Routing />
      <Footer />
    </div>
  );
};
