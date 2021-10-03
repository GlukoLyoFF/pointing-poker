import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { GameCard } from 'core/components/gameCard/GameCard';
import { useDispatch } from 'react-redux';
import { IssueVote } from 'core/types/issueVotesType';
import { setIssueVote, setIssueVoteResult } from 'store/actionCreators/issueVote';
import { socket } from 'core/api/socket.service';
import { postNewIssueVote } from 'core/api/issueVote.service';
import { ITimerMsg, IVoteIssueMsg, Message } from 'core/types/socketMessageType';
import { getIssueById } from 'core/api/issues.service';
import { Roles } from 'core/types/roleType';

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
    const socketAddVoteByIssueMsg = (msg: IVoteIssueMsg) => {
      dispatch(setIssueVoteResult(msg.payload));
    };
    socket.on('addVoteByIssueMsg', socketAddVoteByIssueMsg);
    return () => {
      socket.off('addVoteByIssueMsg', socketAddVoteByIssueMsg);
    };
  }, []);

  useEffect(() => {
    if (timerValue === 0 && isClick && currentUser.role !== Roles.observer) {
      handleClickCard('unknown', 'cup');
    }
  }, [timerValue]);

  useEffect(() => {
    const handleClickCardValue = (msg: ITimerMsg) => {
      if (msg.payload === 'start') {
        setIsClickValue(true);
      } else if (msg.payload === 'restart') {
        setIsClickValue(true);
      } else if (
        msg.payload === 'end' &&
        !gameSettings.isTimer &&
        isClick &&
        (gameSettings.isAsPlayer || currentUser.role === Roles.user) &&
        currentUser.role !== Roles.observer
      ) {
        handleClickCard('unknown', 'cup');
      } else if (
        msg.payload === 'end' &&
        issueVote.vote.value === '' &&
        (gameSettings.isAsPlayer || currentUser.role === Roles.user) &&
        currentUser.role !== Roles.observer
      ) {
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
      {(gameSettings.isAsPlayer && currentUser.role === Roles.creator) ||
      currentUser.role === Roles.user
        ? gameSettings.cardValues.map(elem => {
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
          })
        : null}
    </Grid>
  );
};
