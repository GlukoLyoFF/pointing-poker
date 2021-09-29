import React, { useEffect, useState } from 'react';
import { EditHeading } from 'core/components/editHeading/EditHeading';
import { InputField } from 'core/components/InputField';
import { AppButton } from 'core/components/Button';
import { Text } from 'core/components/Text';
import { UserCard } from 'core/components/userCard/UserCard';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { getCreator } from 'store/actionCreators/creator';
import { Roles } from 'core/types/roleType';
import { setGameLink } from 'store/actionCreators/gameInfo';
import styles from './ScramMaster.module.scss';

export const ScramMaster: React.FC = () => {
  const { creator } = useTypeSelector(state => state.creator);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameInfo } = useTypeSelector(state => state.gameInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCreator(currentUser.gameId));
  }, []);

  const handleChangeLink = (value: string): void => {
    dispatch(setGameLink(value));
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
          <AppButton name={'Start game'} color={'blue'} onClickHandler={() => {}} />
          <AppButton name={'Cancel game'} color={'white'} onClickHandler={() => {}} />
        </div>
      ) : (
        <div className={styles.btnBoxUser}>
          <AppButton name={'Exit'} color={'white'} onClickHandler={() => {}} />
        </div>
      )}
    </>
  );
};
