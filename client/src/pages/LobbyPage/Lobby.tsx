import React from 'react';
import { useHistory } from 'react-router';
import { socket } from 'core/api/socket.service';
import { Message } from 'core/types/socketMessageType';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import { Members } from './Members/Members';
import { Issues } from './Issues/Issues';
import { ScramMaster } from './ScramMaster/ScramMaster';
import { LobbySettings } from './Settings';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { useDispatch } from 'react-redux';
import { getGameInfo } from 'store/actionCreators/gameInfo';
import styles from './Lobby.module.scss';

export const Lobby: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const socketGoToGamePage = (msg: { event: string; payload: string }) => {
    if (msg.payload === Message.startGame) {
      history.push('/game');
    }
  };

  const socketClearUser = () => {
    dispatch(clearCurrentUser(currentUser));
  };

  React.useEffect(() => {
    dispatch(getGameInfo(currentUser.gameId));
    socket.on(Message.startRound, socketGoToGamePage);
    socket.on(Message.finishGameMsg, socketClearUser);

    return () => {
      socket.off(Message.startRound, socketGoToGamePage);
      socket.off(Message.finishGameMsg, socketClearUser);
    };
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
    </main>
  );
};
