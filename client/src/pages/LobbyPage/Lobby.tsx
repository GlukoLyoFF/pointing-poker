import React from 'react';
import { Members } from './Members/Members';
import { Issues } from './Issues/Issues';
import { ScramMaster } from './ScramMaster/ScramMaster';
import { LobbySettings } from './Settings';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { useDispatch } from 'react-redux';
import { getGameInfo } from 'store/actionCreators/gameInfo';
import styles from './Lobby.module.scss';
import { Chat } from 'core/components/chat/Chat';

export const Lobby: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGameInfo(currentUser.gameId));
  }, []);

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
      <Chat />
    </main>
  );
};
