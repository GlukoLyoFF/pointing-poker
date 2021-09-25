import React from 'react';
import { Grid, Switch, withStyles } from '@material-ui/core';
import { Text } from 'core/components/Text';

const InnerSwitch = withStyles(theme => ({
  root: {
    width: 55,
    height: 30,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 5,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(25px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);',
  },
  track: {
    borderRadius: 30 / 2,
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25);',
    opacity: 1,
    backgroundColor: theme.palette.grey[400],
  },
  checked: {},
}))(Switch);

export const AppSwitch: React.FC<ISwitchProps> = ({ label, ...rest }): JSX.Element => {
  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item xs={8}>
        <Text textLvl="label">{label}</Text>
      </Grid>
      <Grid item xs>
        <InnerSwitch {...rest} />
      </Grid>
    </Grid>
  );
};

interface ISwitchProps {
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  label: string;
}
