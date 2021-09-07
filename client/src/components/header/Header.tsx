import React from 'react';
import logo from '../../assets/header-logo.png';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logo} />
      <div className={styles.header_bottomLine} />
    </header>
  );
};
