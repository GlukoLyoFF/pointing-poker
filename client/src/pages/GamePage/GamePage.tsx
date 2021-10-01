import React, { useState } from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { CardField } from './CardField/CardField';
import { IssueGameSection } from './IssueGameSection/IssueGameSection';
import { ScramMasterGameSection } from './ScramMasterGameSection/ScramMasterGameSection';
import { ProgressSection } from './ProgressSection/ProgressSection';
import styles from './GamePage.module.scss';

export const GamePage: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameSettings } = useTypeSelector(state => state.gameInfo.gameInfo);
  const [timerValue, setTimerValue] = useState(Number(gameSettings.roundTime));
  const [chooseIssueId, setChooseIssueId] = useState('');

  const handleTimerValue = (num: number) => {
    setTimerValue(num);
  };

  const handleChooseIssueId = (id: string) => {
    setChooseIssueId(id);
  };

  return (
    <main className={styles.container}>
      <div className={styles.gamePage}>
        <ScramMasterGameSection timerValue={timerValue} />
        <IssueGameSection
          handleTimerValue={handleTimerValue}
          handleChooseIssueId={handleChooseIssueId}
        />
        {currentUser.role === Roles.user ||
        (currentUser.role === Roles.creator && gameSettings.isAsPlayer === true) ? (
          <CardField chooseIssueId={chooseIssueId} />
        ) : null}
      </div>
      <ProgressSection />
    </main>
  );
};
