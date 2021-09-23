import { Grid } from '@material-ui/core';
import React from 'react';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { GameCard } from 'core/components/gameCard/GameCard';

export const CardField: React.FC = () => {
  const settings = useTypeSelector(store => store.settings);

  return (
    <Grid container>
      {settings.cardValues.map(({ key, value }) => {
        return (
          <Grid item xs md key={key}>
            <GameCard type={settings.shortScoreType} value={value} />
          </Grid>
        );
      })}
    </Grid>
  );
};
