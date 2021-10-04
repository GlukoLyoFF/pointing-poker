import React from 'react';
import { useHistory } from 'react-router';
import { socket } from 'core/api/socket.service';
import { Message } from 'core/types/socketMessageType';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import { Members } from './Members/Members';
import { Issues } from './Issues/Issues';
import { ScramMaster } from './ScramMaster/ScramMaster';
import { LobbySettings } from './Settings';
import { KickVotingModal } from 'core/components/modals/KickVotingModal';
import { Chat } from 'core/components/chat/Chat';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { useDispatch } from 'react-redux';
import { getGameInfo, setGameInfo } from 'store/actionCreators/gameInfo';
import { IGame } from 'core/types/get200Types';
import styles from './Lobby.module.scss';

export const Lobby: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const socketGoToGamePage = (msg: { event: string; payload: string }) => {
    if (msg.payload === Message.startGame) {
      dispatch(getGameInfo(currentUser.gameId));
      history.push('/game');
    }
  };

  const socketClearUser = ({ payload }: { event: string; payload: string }) => {
    if (payload === currentUser.gameId) {
      dispatch(clearCurrentUser(currentUser));
    }
  };

  const socketChangeTitle = (msg: { event: string; payload: IGame }) => {
    dispatch(setGameInfo(msg.payload));
  };

  React.useEffect(() => {
    dispatch(getGameInfo(currentUser.gameId));
    socket.on(Message.startRound, socketGoToGamePage);
    socket.on(Message.finishGameMsg, socketClearUser);
    socket.on(Message.changeGameTitle, socketChangeTitle);

    return () => {
      socket.off(Message.startRound, socketGoToGamePage);
      socket.off(Message.finishGameMsg, socketClearUser);
      socket.off(Message.changeGameTitle, socketChangeTitle);
    };
  }, []);

  return (
    <main className={styles.container}>
      <ScramMaster />
      <Members />
      <KickVotingModal />
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
