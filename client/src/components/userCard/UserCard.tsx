import React from 'react';
import { Text } from '../Text';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import styles from './UserCard.module.scss';

interface UserCardProp {
  name: string;
  surname?: string;
  job?: string;
  id: string;
  handleFlag: (flag: boolean) => void;
  handleUserName: (name: string) => void;
  handleUserId: (id: string) => void;
}

export const UserCard: React.FC<UserCardProp> = ({
  name,
  surname = '',
  job = '',
  id,
  handleFlag,
  handleUserName,
  handleUserId,
}) => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>{`${name[0]}${!surname[0] ? '' : surname[0]}`}</div>
      <div className={styles.name}>
        <Text textLvl={'base'}>{`${name} ${surname}`}</Text>
        <div className={styles.job}>
          <Text textLvl={'comment'}>{`${job}`}</Text>
        </div>
      </div>
      <NotInterestedIcon
        onClick={() => {
          handleFlag(true);
          handleUserName(name);
          handleUserId(id);
        }}
      />
    </div>
  );
};
