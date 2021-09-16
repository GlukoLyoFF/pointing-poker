import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { AddGameCard } from '../AddGameCard';
import { GameCard } from '../GameCard';
import { InputField } from '../InputField';
import { RoundTimer } from '../RoundTimer';
import { AppSwitch } from '../Switch';
import { Text } from '../Text';

interface IGameSettings {
  masterPlayer: boolean;
  changeCard: boolean;
  isTimer: boolean;
  scoreType: string;
  shortScoreType: string;
  roundTime?: number;
  cardValues: { key: string; value: string }[];
}

const setKey = (val: string): string => {
  return window.btoa(`${Date.now()}-${val}`);
};

export const LobbySettings: React.FC = (): JSX.Element => {
  const [gameSettings, setGameSettings] = React.useState<IGameSettings>({
    masterPlayer: false,
    changeCard: false,
    isTimer: false,
    roundTime: 150000,
    scoreType: '',
    shortScoreType: '',
    cardValues: [
      { key: '1', value: '13' },
      { key: '2', value: '12' },
      { key: '3', value: '1' },
    ],
  });

  const handleSwitch = ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
    setGameSettings({ ...gameSettings, [name]: checked });
  };

  const gameCards = gameSettings.cardValues.map(({ key, value }) => {
    return (
      <Grid item xs key={key}>
        <GameCard
          type={gameSettings.shortScoreType}
          value={value}
          editable={true}
          onChangeValue={() => {
            console.log(`change card value for card ${value}`);
          }}
          onRemoveCard={() => {
            const newCardValues = gameSettings.cardValues.filter(card => card.key !== key);
            setGameSettings({ ...gameSettings, cardValues: newCardValues });
          }}
        />
      </Grid>
    );
  });

  return (
    <Box m="1rem">
      <Text textLvl="label" isBold={true}>
        Game Settings:
      </Text>
      <Box>
        <AppSwitch
          label="Scram master as player:"
          name="masterPlayer"
          checked={gameSettings.masterPlayer}
          onChange={handleSwitch}
        />
        <AppSwitch
          label="Changing card in round end:"
          name="changeCard"
          checked={gameSettings.changeCard}
          onChange={handleSwitch}
        />
        <AppSwitch
          label="Is timer needed:"
          name="isTimer"
          checked={gameSettings.isTimer}
          onChange={handleSwitch}
        />
        <InputField
          name="scoreType"
          value={gameSettings.scoreType}
          labelText="Score type:"
          onChange={val => setGameSettings({ ...gameSettings, scoreType: val })}
        />
        <InputField
          name="shortScoreType"
          value={gameSettings.shortScoreType}
          labelText="Score type (Short, no more than 3 symbols):"
          onChange={val =>
            setGameSettings({ ...gameSettings, shortScoreType: val.trim().substring(0, 3) })
          }
        />
        {gameSettings.isTimer ? (
          <RoundTimer
            time={gameSettings.roundTime}
            label="Round time:"
            editable={true}
            onChange={val => setGameSettings({ ...gameSettings, roundTime: val })}
          />
        ) : (
          ''
        )}
        <Text textLvl="label">Add card values:</Text>
        <Grid container spacing={2} justifyContent="flex-start">
          {gameCards}
          <Grid item xs style={{ flexGrow: 6 }}>
            <AddGameCard
              onClick={() => {
                const newCardValues = [
                  ...gameSettings.cardValues,
                  { key: setKey('Undefined'), value: 'Undefined' },
                ];
                setGameSettings({ ...gameSettings, cardValues: newCardValues });
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
