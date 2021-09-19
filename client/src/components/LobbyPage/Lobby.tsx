import React from 'react';
import { Members } from './Members/Members';
import { Issues } from './Issues/Issues';
import { ScramMaster } from './ScramMaster/ScramMaster';
import styles from './Lobby.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';

export const Lobby: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);

  return (
    <main className={styles.container}>
      <ScramMaster
        gameId={currentUser.gameId}
        role={currentUser.role}
        userId={currentUser.userId}
      />
      <Members gameId={currentUser.gameId} role={currentUser.role} userId={currentUser.userId} />
      {currentUser.role === 'creator' ? <Issues gameId={currentUser.gameId} /> : null}
    </main>
  );
};
