import React from 'react';
import { Routing } from 'routing/Routing';
import { Footer } from 'core/components/footer/Footer';
import { Header } from 'core/components/header/Header';
import style from './app.module.scss';

export const App: React.FC = () => {
  return (
    <div className={style.app}>
      <Header />
      <Routing />
      <Footer />
    </div>
  );
};
