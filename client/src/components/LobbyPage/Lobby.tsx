import React from 'react';
import { Members } from './Members/Members';
import { Issues } from './Issues/Issues';
import { ScramMaster } from './ScramMaster/ScramMaster';
import { LobbySettings } from './Settings';
import styles from './Lobby.module.scss';

export const Lobby: React.FC = () => {
  return (
    <main className={styles.container}>
      <ScramMaster />
      <Members />
      <Issues />
      <LobbySettings />
    </main>
  );
};
