import React, { useEffect, useState } from 'react';
import { Text } from 'core/components/Text';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { socket } from 'core/api/socket.service';
import { ITimerMsg, Message } from 'core/types/socketMessageType';
import styles from './ProgressCard.module.scss';
import { IssueVoteRes } from 'core/types/issueVotesType';

interface ProgressCardProp {
  chooseIssueId: string;
  userId: string;
}

export const ProgressCard: React.FC<ProgressCardProp> = ({ chooseIssueId, userId }) => {
  const { results } = useTypeSelector(state => state.issueVote);
  const { gameSettings } = useTypeSelector(state => state.gameInfo.gameInfo);
  const [isFlagRender, setIsFlagRender] = useState(false);
  const getScoreValue = () => {
    return results.find(
      ({ playerId, issueId }) => playerId === userId && issueId === chooseIssueId,
    );
  };

  const [scoreValue, setScoreValue] = useState<IssueVoteRes | undefined>(getScoreValue());

  useEffect(() => {
    const renderProgressCards = (msg: ITimerMsg) => {
      if (msg.payload === 'end') {
        setIsFlagRender(true);
      } else if (msg.payload === 'start') {
        setIsFlagRender(false);
      }
    };

    socket.on(Message.endRound, renderProgressCards);
    socket.on(Message.startRound, renderProgressCards);
    return () => {
      socket.off(Message.endRound, renderProgressCards);
      socket.off(Message.startRound, renderProgressCards);
    };
  }, []);

  useEffect(() => {
    setScoreValue(getScoreValue());
    if (gameSettings.isChangeCard && scoreValue) {
      setIsFlagRender(true);
    }
  }, [results]);

  return (
    <div className={styles.container}>
      <Text textLvl="label" isBold={true}>
        {scoreValue?.vote.value && isFlagRender ? scoreValue.vote.value : 'In progress'}
      </Text>
    </div>
  );
};
