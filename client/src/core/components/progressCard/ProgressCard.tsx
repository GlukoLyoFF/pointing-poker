import React, { useEffect, useState } from 'react';
import { Text } from 'core/components/Text';
import styles from './ProgressCard.module.scss';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { socket } from 'core/api/socket.service';
import { Message } from 'core/types/socketMessageType';

interface ProgressCardProp {
  chooseIssueId: string;
  userId: string;
}

export const ProgressCard: React.FC<ProgressCardProp> = ({ chooseIssueId, userId }) => {
  const { results } = useTypeSelector(state => state.issueVote);
  const { gameSettings } = useTypeSelector(state => state.gameInfo.gameInfo);
  const [isFlagRender, setIsFlagRender] = useState(false);
  const [scoreValue, setScoreValue] = useState(
    results.find(item => item.playerId === userId && item.issueId === chooseIssueId),
  );

  useEffect(() => {
    socket.on(Message.endRound, data => {
      if (data.payload === 'end' && gameSettings.isChangeCard) {
        setIsFlagRender(true);
      }
    });
    socket.on(Message.startRound, data => {
      if (data.payload === 'start') {
        setIsFlagRender(false);
      }
    });
  }, []);

  useEffect(() => {
    setScoreValue(results.find(item => item.playerId === userId && item.issueId === chooseIssueId));
  }, [results]);

  return (
    <div className={styles.container}>
      <Text textLvl="label" isBold={true}>
        {scoreValue?.vote.value && isFlagRender ? scoreValue.vote.value : 'In progress'}
      </Text>
    </div>
  );
};
