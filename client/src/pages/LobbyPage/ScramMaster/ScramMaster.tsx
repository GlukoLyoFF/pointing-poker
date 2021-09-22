import React, { useEffect, useState } from 'react';
import { EditHeading } from 'core/components/editHeading/EditHeading';
import { InputField } from 'core/components/InputField';
import { AppButton } from 'core/components/Button';
import { Text } from 'core/components/Text';
import { UserCard } from 'core/components/userCard/UserCard';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { getCreator } from 'store/actionCreators/creator';
import styles from './ScramMaster.module.scss';
import { Roles } from 'core/types/roleType';

export const ScramMaster: React.FC = () => {
  const { creator } = useTypeSelector(state => state.creator);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const url = window.location.href;
  const [getLinkValue, setLinkValue] = useState(url);

  useEffect(() => {
    dispatch(getCreator(currentUser.gameId));
  }, []);

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
            value={`${getLinkValue}`}
            labelText={<span>Link to lobby:</span>}
            onChange={event => setLinkValue(event)}
          />
          <div>
            <AppButton
              name={'Copy'}
              color={'blue'}
              onClickHandler={() => {
                navigator.clipboard.writeText(getLinkValue);
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
