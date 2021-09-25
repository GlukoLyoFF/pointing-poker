import React from 'react';
import { Members } from './Members/Members';
import { Issues } from './Issues/Issues';
import { ScramMaster } from './ScramMaster/ScramMaster';
import { LobbySettings } from './Settings';
import styles from './Lobby.module.scss';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';

export const Lobby: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);

  return (
    <main className={styles.container}>
      <ScramMaster />
      <Members />
      {currentUser.role === Roles.creator ? (
        <>
          <Issues />
          <LobbySettings />
        </>
      ) : null}
    </main>
  );
};
