import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { GameCard } from 'core/components/gameCard/GameCard';
import { useDispatch } from 'react-redux';
import { IssueVote } from 'core/types/issueVotesType';
import { setIssueVote, setIssueVoteResult } from 'store/actionCreators/issueVote';
import { socket } from 'core/api/socket.service';
import { postNewIssueVote } from 'core/api/issueVote.service';
import { ITimerMsg, Message } from 'core/types/socketMessageType';
import { getIssueById } from 'core/api/issues.service';

interface CardFieldProps {
  chooseIssueId: string;
  timerValue: number;
}

export const CardField: React.FC<CardFieldProps> = ({ chooseIssueId, timerValue }) => {
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { issueVote } = useTypeSelector(state => state.issueVote);
  const [isClick, setIsClickValue] = useState(false);
  const dispatch = useDispatch();
  let issueVoteCard: IssueVote;

  const handleClickCard = (key: string, value: string) => {
    issueVoteCard = {
      vote: {
        key: `${key}`,
        value: `${value}`,
      },
      gameId: `${currentUser.gameId}`,
      playerId: `${currentUser.userId}`,
      issueId: `${chooseIssueId}`,
    };
    dispatch(setIssueVote(issueVoteCard));
    postNewIssueVote(issueVoteCard);
    setIsClickValue(false);
  };

  useEffect(() => {
    socket.on('addVoteByIssueMsg', data => {
      dispatch(setIssueVoteResult(data.payload));
    });
  }, []);

  useEffect(() => {
    if (timerValue === 0 && isClick) {
      handleClickCard('unknown', 'cup');
    }
  }, [timerValue]);

  useEffect(() => {
    const handleClickCardValue = (msg: ITimerMsg) => {
      if (msg.payload === 'start') {
        setIsClickValue(true);
      } else if (msg.payload === 'restart') {
        setIsClickValue(true);
      } else if (msg.payload === 'end' && !gameSettings.isTimer && isClick) {
        handleClickCard('unknown', 'cup');
      } else if (msg.payload === 'end' && issueVote.vote.value === '') {
        handleClickCard('unknown', 'cup');
      }
    };
    socket.on(Message.startRound, handleClickCardValue);
    socket.on(Message.restartRound, handleClickCardValue);
    socket.on(Message.endRound, handleClickCardValue);
    return () => {
      socket.off(Message.startRound, handleClickCardValue);
      socket.off(Message.restartRound, handleClickCardValue);
      socket.off(Message.endRound, handleClickCardValue);
    };
  }, [isClick && chooseIssueId]);

  return (
    <Grid container>
      {gameSettings.cardValues.map(elem => {
        return (
          <Grid item xs md key={elem.key}>
            <GameCard
              type={gameSettings.shortScoreType}
              value={elem.value}
              keyCard={elem.key}
              isClick={isClick}
              onClickHandler={handleClickCard}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
