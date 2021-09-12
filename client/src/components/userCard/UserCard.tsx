import React from 'react';
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
        {`${name}`} {`${surname}`}
        <div className={styles.job}>{`${job}`}</div>
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
