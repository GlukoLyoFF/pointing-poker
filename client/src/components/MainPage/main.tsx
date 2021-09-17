import React from 'react';
import { AppButton } from '../Button';
import { InputField } from '../InputField';
import { Text } from '../Text';
import logo from '../../assets/plaining-poker-main-logo.png';
import style from './main.module.scss';
import { AppModal } from '../modal/Modal';
import { ImgUpload } from '../ImgUpload/ImgUpload';

export const Main: React.FC = (): JSX.Element => {
  const [connectUrl, setConnectUrl] = React.useState('');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleStartGameOpen = () => {
    setIsOpen(true);
  };

  const handleStartGameClose = () => {
    setIsOpen(false);
  };

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
          <AppButton name="Start new game" onClickHandler={handleStartGameOpen} />
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
      <AppModal
        isShow={isOpen}
        title="Start new game"
        handleSubmit={() => {}}
        handleCancel={handleStartGameClose}
      >
        <Text textLvl="base">Game started</Text>
      </AppModal>
    </main>
  );
};
