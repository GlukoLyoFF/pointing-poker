import React, { useEffect, useState } from 'react';
import { EditHeading } from '../../editHeading/EditHeading';
import { InputField } from '../../InputField';
import { AppButton } from '../../Button';
import { Text } from '../../Text';
import { UserCard } from '../../userCard/UserCard';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { getCreator } from '../../../store/actionCreators/creator';
import styles from './ScramMaster.module.scss';

export const ScramMaster: React.FC = () => {
  const creator = useTypeSelector(state => state.creator.creator);
  const dispatch = useDispatch();
  const url = window.location.href;
  const [getLinkValue, setLinkValue] = useState(url);

  useEffect(() => {
    dispatch(getCreator('asdfasdfas'));
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
            status={'creator'}
            job={creator.jobPosition}
          />
        </div>
      </div>
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
      <div className={styles.btnBox}>
        <AppButton name={'Start game'} color={'blue'} onClickHandler={() => {}} />
        <AppButton name={'Cancel game'} color={'white'} onClickHandler={() => {}} />
      </div>
    </>
  );
};
