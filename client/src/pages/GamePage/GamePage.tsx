import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { socket } from 'core/api/socket.service';
import { Message } from 'core/types/socketMessageType';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import { CardField } from './CardField/CardField';
import { IssueGameSection } from './IssueGameSection/IssueGameSection';
import { ScramMasterGameSection } from './ScramMasterGameSection/ScramMasterGameSection';
import { ProgressSection } from './ProgressSection/ProgressSection';
import { KickVotingModal } from 'core/components/modals/KickVotingModal';
import styles from './GamePage.module.scss';

export const GamePage: React.FC = () => {
  const { gameSettings } = useTypeSelector(state => state.gameInfo.gameInfo);
  const [timerValue, setTimerValue] = React.useState(gameSettings.roundTime || 0);
  const [chooseIssueId, setChooseIssueId] = React.useState('');
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const socketClearUser = ({ payload }: { event: string; payload: string }) => {
    if (payload === currentUser.gameId) {
      dispatch(clearCurrentUser(currentUser));
    }
  };

  const handleTimerValue = (num: number) => {
    if (num === 150000) {
      setTimerValue(Number(gameSettings.roundTime));
    } else {
      setTimerValue(num);
    }
  };

  const handleChooseIssueId = (id: string) => {
    setChooseIssueId(id);
  };

  React.useEffect(() => {
    setTimerValue(gameSettings.roundTime ? gameSettings.roundTime : 0);
  }, [gameSettings]);

  React.useEffect(() => {
    socket.on(Message.finishGameMsg, socketClearUser);

    return () => {
      socket.off(Message.finishGameMsg, socketClearUser);
    };
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.gamePage}>
        <ScramMasterGameSection timerValue={timerValue} />
        <IssueGameSection
          handleTimerValue={handleTimerValue}
          handleChooseIssueId={handleChooseIssueId}
        />
        <CardField chooseIssueId={chooseIssueId} timerValue={timerValue} />
      </div>
      <ProgressSection chooseIssueId={chooseIssueId} />
      <KickVotingModal />
    </main>
  );
};
