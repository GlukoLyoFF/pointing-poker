import { Grid } from '@material-ui/core';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import React from 'react';
import { GameCard } from '../gameCard/GameCard';

export const StatisticCard: React.FC = () => {
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);
  const { results } = useTypeSelector(state => state.issueVote);
  let count = 0;
  return (
    <Grid container direction="row">
      {gameSettings.cardValues.map(card => {
        return (
          <div key={card.key}>
            <GameCard type={gameSettings.shortScoreType} value={card.value} editable={true} />
            <div>
              {results.map((elem, index) => {
                if (elem.vote.key === card.key) {
                  count = count + 1;
                }
                if (index === results.length - 1) {
                  const percent: number = (count * 100) / results.length;
                  count = 0;
                  return `${Math.round(percent)}%`;
                }
              })}
            </div>
          </div>
        );
      })}
    </Grid>
  );
};
