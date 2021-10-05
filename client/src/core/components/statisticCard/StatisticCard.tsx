import { Grid } from '@material-ui/core';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { getPercentResultByCard } from 'core/utils/result-percent';
import React from 'react';
import { GameCard } from '../gameCard/GameCard';

export const StatisticCard: React.FC = () => {
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);
  const { results } = useTypeSelector(state => state.issueVote);

  return (
    <Grid container direction="row">
      {gameSettings.cardValues.map(card => {
        return (
          <div key={card.key}>
            <GameCard type={gameSettings.shortScoreType} value={card.value} editable={true} />
            <div>{`${getPercentResultByCard(results, card.key)}%`}</div>
          </div>
        );
      })}
    </Grid>
  );
};
