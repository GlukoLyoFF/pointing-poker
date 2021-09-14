import React from 'react';
import { Members } from './Members/Members';
import styles from './Lobby.module.scss';
import { Issues } from './Issues/Issues';

export const Lobby: React.FC = () => {
  return (
    <main className={styles.container}>
      <Members />
      <Issues />
    </main>
  );
};
