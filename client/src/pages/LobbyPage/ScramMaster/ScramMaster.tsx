import React, { useEffect } from 'react';
import { EditHeading } from 'core/components/editHeading/EditHeading';
import { AppModal } from 'core/components/modal/Modal';
import { InputField } from 'core/components/InputField';
import { AppButton } from 'core/components/Button';
import { Text } from 'core/components/Text';
import { UserCard } from 'core/components/userCard/UserCard';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { getCreator } from 'store/actionCreators/creator';
import { Roles } from 'core/types/roleType';
import { getGameInfo, postGameInfo, setGameLink } from 'store/actionCreators/gameInfo';
import { finishGame, sendStartGame } from 'core/api/socket.service';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import { deleteUserById } from 'core/api/users.service';
import styles from './ScramMaster.module.scss';

export const ScramMaster: React.FC = () => {
  const { creator } = useTypeSelector(state => state.creator);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameInfo } = useTypeSelector(state => state.gameInfo);
  const dispatch = useDispatch();
  const [showModals, setShowModals] = React.useState<{ cancel: boolean; exit: boolean }>({
    cancel: false,
    exit: false,
  });

  useEffect(() => {
    dispatch(getCreator(currentUser.gameId));
  }, []);

  const handleChangeLink = (value: string): void => {
    dispatch(setGameLink(value));
  };
  const handleStartGame = (): void => {
    dispatch(postGameInfo(gameInfo));
    sendStartGame();
  };
  const handleFinishGame = (): void => {
    finishGame(currentUser);
  };

  const handleExitGame = (): void => {
    deleteUserById(currentUser.userId);
    dispatch(clearCurrentUser(currentUser));
  };

  return (
    <>
      <EditHeading />
      <div className={styles.heading}>
        <Text textLvl="comment">Scram master:</Text>
        <div className={styles.card}>
          <UserCard
            image={creator.image}
            name={creator.firstName}
            surname={creator.lastName}
            id={creator._id}
            status={Roles.creator}
            job={creator.jobPosition}
          />
        </div>
      </div>
      {currentUser.role === Roles.creator ? (
        <div className={styles.copyBox}>
          <InputField
            name={'copy'}
            value={`${gameInfo.url}`}
            labelText="Link to lobby:"
            onChange={handleChangeLink}
          />
          <div>
            <AppButton
              name={'Copy'}
              color={'blue'}
              onClickHandler={() => {
                navigator.clipboard.writeText(gameInfo.url);
              }}
            />
          </div>
        </div>
      ) : null}
      {currentUser.role === Roles.creator ? (
        <div className={styles.btnBox}>
          <AppButton name={'Start game'} color={'blue'} onClickHandler={handleStartGame} />
          <AppButton
            name={'Cancel game'}
            color={'white'}
            onClickHandler={() => setShowModals({ ...showModals, cancel: true })}
          />
        </div>
      ) : (
        <div className={styles.btnBoxUser}>
          <AppButton
            name={'Exit'}
            color={'white'}
            onClickHandler={() => setShowModals({ ...showModals, exit: true })}
          />
        </div>
      )}
      <AppModal
        title="Cancel game"
        isShow={showModals.cancel}
        handleSubmit={handleFinishGame}
        handleCancel={() => setShowModals({ ...showModals, cancel: false })}
      >
        <Text textLvl="base">Do you really want to cancel game?</Text>
      </AppModal>
      <AppModal
        title="Exit game"
        isShow={showModals.exit}
        handleSubmit={handleExitGame}
        handleCancel={() => setShowModals({ ...showModals, exit: false })}
      >
        <Text textLvl="base">Do you really want to quit?</Text>
      </AppModal>
    </>
  );
};
