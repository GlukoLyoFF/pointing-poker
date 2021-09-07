import React from 'react';
import { AppButton } from '../button';
import { InputField } from '../input-field';
import { Text } from '../text';
import logo from '../../assets/plaining-poker-main-logo.png';
import style from './main.module.scss';

export const Main: React.FC = (): JSX.Element => {
  const [connectUrl, setConnectUrl] = React.useState('');
  const connectLabel = (
    <Text textLvl="base">
      Connect to lobby by{' '}
      <Text textLvl="base" isHighlight={true}>
        URL
      </Text>
      :
    </Text>
  );

  return (
    <main className={style.main}>
      <img src={logo} alt="Poker Plaining" />
      <div className={style.gameOption}>
        <Text textLvl="subtitle" isHighlight={true} isBold={true}>
          Start your planning:
        </Text>
        <div className={style.newGame}>
          <Text textLvl="base">Create session:</Text>
          <AppButton name="Start new game" onClickHandler={() => {}} />
        </div>
      </div>
      <div className={style.gameOption}>
        <Text textLvl="subtitle" isHighlight={true} isBold={true}>
          OR:
        </Text>
        <div className={style.connectGame}>
          <InputField
            name="connect-field"
            value={connectUrl}
            onChange={setConnectUrl}
            labelText={connectLabel}
          />
          <AppButton name="Connect" onClickHandler={() => {}} />
        </div>
      </div>
    </main>
  );
};
