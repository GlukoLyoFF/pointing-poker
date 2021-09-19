import React from 'react';
import { Members } from './Members/Members';
import { Issues } from './Issues/Issues';
import { ScramMaster } from './ScramMaster/ScramMaster';
import styles from './Lobby.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { Roles } from '../../types/roleType';

export const Lobby: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);

  return (
    <main className={styles.container}>
      <ScramMaster />
      <Members />
      {currentUser.role === Roles.creator ? <Issues /> : null}
    </main>
  );
};
