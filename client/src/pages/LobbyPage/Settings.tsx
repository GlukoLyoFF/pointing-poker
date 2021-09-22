import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import {
  setSettingGameCards,
  setSettingIsChangeCard,
  setSettingIsMasterPlayer,
  setSettingIsTimer,
  setSettingRoundTime,
  setSettingScoreType,
  setSettingShortScoreType,
} from 'store/actionCreators/settings';
import { generateKey } from 'core/utils/key-generator';
import { AddGameCard } from 'core/components/gameCard/AddGameCard';
import { EditableGameCard } from 'core/components/gameCard/EditableGameCard';
import { InputField } from 'core/components/InputField';
import { RoundTimer } from 'core/components/RoundTimer';
import { AppSwitch } from 'core/components/Switch';
import { Text } from 'core/components/Text';

export const LobbySettings: React.FC = (): JSX.Element => {
  const state = useTypeSelector(store => store.settings);
  const dispatch = useDispatch();

  const handleIsAsPlayer = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSettingIsMasterPlayer(checked));
  };

  const handleIsChangeCard = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSettingIsChangeCard(checked));
  };

  const handleIsTimer = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSettingIsTimer(checked));
  };

  const changeScoreType = (value: string): void => {
    dispatch(setSettingScoreType(value));
  };

  const changeShortScoreType = (value: string): void => {
    dispatch(setSettingShortScoreType(value));
  };

  const changeRoundTime = (value: number): void => {
    dispatch(setSettingRoundTime(value));
  };

  const addNewGameCard = (): void => {
    const newCardValues = [
      ...state.cardValues,
      { key: generateKey('Undefined'), value: 'Undefined' },
    ];
    dispatch(setSettingGameCards(newCardValues));
  };

  const changeGameCard = (idCard: string, value: string): void => {
    const newCardValues = state.cardValues.map(card =>
      card.key === idCard ? { key: card.key, value: value } : card,
    );
    dispatch(setSettingGameCards(newCardValues));
  };

  const removeGameCard = (idCard: string): void => {
    const newCardValues = state.cardValues.filter(card => card.key !== idCard);
    dispatch(setSettingGameCards(newCardValues));
  };

  return (
    <Box m="1rem">
      <Text textLvl="label" isBold={true}>
        Game Settings:
      </Text>
      <Box>
        <AppSwitch
          label="Scram master as player:"
          name="isAsPlayer"
          checked={state.isAsPlayer}
          onChange={handleIsAsPlayer}
        />
        <AppSwitch
          label="Changing card in round end:"
          name="isChangeCard"
          checked={state.isChangeCard}
          onChange={handleIsChangeCard}
        />
        <AppSwitch
          label="Is timer needed:"
          name="isTimer"
          checked={state.isTimer}
          onChange={handleIsTimer}
        />
        <InputField
          name="scoreType"
          value={state.scoreType}
          labelText="Score type:"
          onChange={changeScoreType}
        />
        <InputField
          name="shortScoreType"
          value={state.shortScoreType}
          labelText="Score type (Short, no more than 3 symbols):"
          onChange={changeShortScoreType}
        />
        {state.isTimer && state.roundTime ? (
          <RoundTimer
            time={state.roundTime}
            label="Round time:"
            editable={true}
            onChange={changeRoundTime}
          />
        ) : (
          ''
        )}
        <Text textLvl="label">Add card values:</Text>
        <Grid container spacing={2} justifyContent="flex-start">
          {state.cardValues.map(({ key, value }) => {
            return (
              <Grid item xs key={key}>
                <EditableGameCard
                  type={state.shortScoreType}
                  value={value}
                  onChangeValue={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                    changeGameCard(key, target.value);
                  }}
                  onRemoveCard={() => removeGameCard(key)}
                />
              </Grid>
            );
          })}
          <Grid item xs style={{ flexGrow: 6 }}>
            <AddGameCard onClick={addNewGameCard} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
