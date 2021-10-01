import React, { useEffect, useState } from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { CardField } from './CardField/CardField';
import { IssueGameSection } from './IssueGameSection/IssueGameSection';
import { ScramMasterGameSection } from './ScramMasterGameSection/ScramMasterGameSection';
import { ProgressSection } from './ProgressSection/ProgressSection';
import styles from './GamePage.module.scss';
import { useDispatch } from 'react-redux';
import { getGameInfo } from 'store/actionCreators/gameInfo';

export const GamePage: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameSettings } = useTypeSelector(state => state.gameInfo.gameInfo);
  const [timerValue, setTimerValue] = useState(gameSettings.roundTime ? gameSettings.roundTime : 0);
  const [chooseIssueId, setChooseIssueId] = useState('');
  const dispatch = useDispatch();

  const handleTimerValue = (num: number) => {
    if (num === 888) {
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
        {currentUser.role === Roles.user ||
        (currentUser.role === Roles.creator && gameSettings.isAsPlayer === true) ? (
          <CardField chooseIssueId={chooseIssueId} timerValue={timerValue} />
        ) : null}
      </div>
      <ProgressSection chooseIssueId={chooseIssueId} />
    </main>
  );
};
