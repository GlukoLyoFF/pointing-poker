import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { socket } from 'core/api/socket.service';
import { Roles } from 'core/types/roleType';
import { Message } from 'core/types/socketMessageType';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import { CardField } from './CardField/CardField';
import { IssueGameSection } from './IssueGameSection/IssueGameSection';
import { ScramMasterGameSection } from './ScramMasterGameSection/ScramMasterGameSection';
import { ProgressSection } from './ProgressSection/ProgressSection';
import { KickVotingModal } from 'core/components/modals/KickVotingModal';
import styles from './GamePage.module.scss';

export const GamePage: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const socketClearUser = ({ payload }: { event: string; payload: string }) => {
    if (payload === currentUser.gameId) {
      dispatch(clearCurrentUser(currentUser));
    }
  };

  React.useEffect(() => {
    socket.on(Message.finishGameMsg, socketClearUser);

    return () => {
      socket.off(Message.finishGameMsg, socketClearUser);
    };
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.gamePage}>
        <ScramMasterGameSection />
        <IssueGameSection />
        {currentUser.role === Roles.user ? <CardField /> : null}
      </div>
      <ProgressSection />
    </main>
  );
};
