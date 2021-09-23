import React from 'react';
import axios from 'axios';
import { AppButton } from '../Button';
import { InputField } from '../InputField';
import { Text } from '../Text';
import { AppModal } from '../modal/Modal';
import { LobbyForm } from '../LobbyForm/LobbyForm';
import logo from '../../assets/plaining-poker-main-logo.png';
import style from './Main.module.scss';

export const Main: React.FC = (): JSX.Element => {
  const [connectUrl, setConnectUrl] = React.useState('');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenConnectLobby, setIsOpenConnectLobby] = React.useState<boolean>(false);
  const [gameId, setGameId] = React.useState('');

  const handleStartGameOpen = () => {
    setIsOpen(true);
  };

  const handleStartGameClose = () => {
    setIsOpen(false);
  };

  const handleConnectLobbyOpen = () => {
    axios.get(connectUrl).then(res => {
      if (res.data._id) {
        setIsOpenConnectLobby(true);
        setGameId(res.data._id);
      }
    });
  };

  const handleConnectLobbyClose = () => {
    setIsOpenConnectLobby(false);
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
          <AppButton name="Connect" onClickHandler={handleConnectLobbyOpen} />
        </div>
      </div>
      <AppModal
        id="startLobby"
        isShow={isOpen}
        title="Start new game"
        handleCancel={handleStartGameClose}
      >
        <LobbyForm id="startLobby" isCreator={true} />
      </AppModal>
      <AppModal
        id="connectLobby"
        isShow={isOpenConnectLobby}
        title="Connect to lobby"
        handleCancel={handleConnectLobbyClose}
      >
        <LobbyForm id="connectLobby" isCreator={false} gameId={gameId} />
      </AppModal>
    </main>
  );
};
