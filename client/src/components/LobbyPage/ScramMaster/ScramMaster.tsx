import React, { useState } from 'react';
import { EditHeading } from '../../editHeading/EditHeading';
import { InputField } from '../../InputField';
import { AppButton } from '../../Button';
import { Text } from '../../Text';
import { UserCard } from '../../userCard/UserCard';
import styles from './ScramMaster.module.scss';

export const ScramMaster: React.FC = () => {
  const url = window.location.href;
  const [getLinkValue, setLinkValue] = useState(url);

  return (
    <>
      <EditHeading />
      <div className={styles.heading}>
        <Text textLvl="comment">Scram master:</Text>
        <div className={styles.card}>
          <UserCard name={'admin'} surname={'admin'} id={'123'} status={'master'} job={'develop'} />
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
