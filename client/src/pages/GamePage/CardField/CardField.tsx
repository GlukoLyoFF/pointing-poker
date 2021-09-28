import { Grid } from '@material-ui/core';
import React from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { GameCard } from 'core/components/gameCard/GameCard';

export const CardField: React.FC = () => {
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);

  return (
    <Grid container>
      {gameSettings.cardValues.map(({ key, value }) => {
        return (
          <Grid item xs md key={key}>
            <GameCard type={gameSettings.shortScoreType} value={value} />
          </Grid>
        );
      })}
    </Grid>
  );
};
