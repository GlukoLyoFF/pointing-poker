import React from 'react';
import { Members } from './Members/Members';
import styles from './Lobby.module.scss';

export const Lobby: React.FC = () => {
  return (
    <main className={styles.container}>
      <Members />
    </main>
  );
};
