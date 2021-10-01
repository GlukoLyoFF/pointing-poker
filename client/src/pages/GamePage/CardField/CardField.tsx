import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { GameCard } from 'core/components/gameCard/GameCard';
import { useDispatch } from 'react-redux';
import { IssueVote } from 'core/types/issueVotesType';
import { setIssueVote } from 'store/actionCreators/issueVote';
import { socket } from 'core/api/socket.service';
import { postNewIssueVote } from 'core/api/issueVote.service';

interface CardFieldProps {
  chooseIssueId: string;
}

export const CardField: React.FC<CardFieldProps> = ({ chooseIssueId }) => {
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { issueVote } = useTypeSelector(state => state.issueVote);
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
  };

  useEffect(() => {
    socket.on('addVoteByIssueMsg', data => {
      console.log(data);
    });
  }, []);

  return (
    <Grid container>
      {gameSettings.cardValues.map(elem => {
        return (
          <Grid item xs md key={elem.key}>
            <GameCard
              type={gameSettings.shortScoreType}
              value={elem.value}
              keyCard={elem.key}
              onClickHandler={handleClickCard}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
