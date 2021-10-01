import React, { useEffect, useState } from 'react';
import { Text } from 'core/components/Text';
import styles from './ProgressCard.module.scss';
import { useTypeSelector } from 'core/hooks/useTypeSelector';

interface ProgressCardProp {
  chooseIssueId: string;
}

export const ProgressCard: React.FC<ProgressCardProp> = ({ chooseIssueId }) => {
  const { results } = useTypeSelector(state => state.issueVote);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const [scoreValue, setScoreValue] = useState(
    results.find(item => item.playerId === currentUser.userId && item.issueId === chooseIssueId),
  );

  useEffect(() => {
    setScoreValue(
      results.find(item => item.playerId === currentUser.userId && item.issueId === chooseIssueId),
    );
  }, [results]);

  return (
    <div className={styles.container}>
      <Text textLvl="label" isBold={true}>
        {scoreValue?.vote.value ? scoreValue.vote.value : 'In progress'}
      </Text>
    </div>
  );
};
