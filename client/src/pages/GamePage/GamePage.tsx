import React, { useEffect, useState } from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { CardField } from './CardField/CardField';
import { IssueGameSection } from './IssueGameSection/IssueGameSection';
import { ScramMasterGameSection } from './ScramMasterGameSection/ScramMasterGameSection';
import { ProgressSection } from './ProgressSection/ProgressSection';
import styles from './GamePage.module.scss';
import { KickVotingModal } from 'core/components/modals/KickVotingModal';

export const GamePage: React.FC = () => {
  const { gameSettings } = useTypeSelector(state => state.gameInfo.gameInfo);
  const [timerValue, setTimerValue] = useState(gameSettings.roundTime ? gameSettings.roundTime : 0);
  const [chooseIssueId, setChooseIssueId] = useState('');

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

  useEffect(() => {
    setTimerValue(gameSettings.roundTime ? gameSettings.roundTime : 0);
  }, [gameSettings]);

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
