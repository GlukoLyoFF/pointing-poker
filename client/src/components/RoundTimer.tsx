import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Text } from './Text';

const getMinutesFromTime = (time: number): number => {
  return Math.floor(time / (60 * 1000));
};

const getSecondsFromTime = (time: number): number => {
  return Math.floor((time / 1000) % 60);
};

export const RoundTimer: React.FC<IRoundTimerProps> = ({
  time,
  label,
  editable,
  onChange,
}): JSX.Element => {
  const hadleChangeMinutes = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange((Number(value) * 60 + getSecondsFromTime(Number(time))) * 1000);
    }
  };
  const handleChangeSeconds = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange((getMinutesFromTime(Number(time)) * 60 + Number(value)) * 1000);
    }
  };

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={10}>
        <Text textLvl="base">{label}</Text>
      </Grid>
      <Grid item xs>
        <TextField
          id="minutes"
          label="minutes"
          type="number"
          value={getMinutesFromTime(Number(time))}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 0, max: 10, step: 1 } }}
          disabled={!editable}
          onChange={hadleChangeMinutes}
        />
      </Grid>
      <Text textLvl="base">:</Text>
      <Grid item xs>
        <TextField
          id="seconds"
          label="seconds"
          type="number"
          value={getSecondsFromTime(Number(time))}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 0, max: 59, step: 1 } }}
          disabled={!editable}
          onChange={handleChangeSeconds}
        />
      </Grid>
    </Grid>
  );
};

interface IRoundTimerProps {
  time?: number;
  label?: string;
  editable?: boolean;
  onChange?: (val: number) => void;
}
