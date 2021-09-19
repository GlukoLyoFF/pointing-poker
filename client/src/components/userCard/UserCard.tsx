import React from 'react';
import { Text } from '../Text';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Avatar } from '../Avatar/Avatar';
import styles from './UserCard.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';

interface UserCardProp {
  name: string;
  surname?: string;
  job?: string;
  id: string;
  handleFlag?: (flag: boolean) => void;
  handleUserName?: (name: string) => void;
  handleUserId?: (id: string) => void;
  status?: string;
  image: string;
}

export const UserCard: React.FC<UserCardProp> = ({
  name,
  surname = '',
  job = '',
  id,
  status,
  handleFlag,
  handleUserName,
  handleUserId,
  image,
}) => {
  const { currentUser } = useTypeSelector(state => state.currentUser);

  return (
    <div className={styles.user}>
      <Avatar img={image} name={name} lastName={surname} />
      <div className={styles.name}>
        {id === currentUser.userId ? (
          <div>
            <Text textLvl="comment">IT'S YOU</Text>
          </div>
        ) : null}
        <Text textLvl={'base'}>{`${name} ${surname}`}</Text>
        <div className={styles.job}>
          <Text textLvl={'comment'}>{`${job}`}</Text>
        </div>
      </div>
      {status === 'user' && currentUser.role != 'observer' ? (
        <NotInterestedIcon
          onClick={() => {
            if (currentUser.role === 'creator') {
              if (handleFlag && handleUserName && handleUserId) {
                handleFlag(true);
                handleUserName(name);
                handleUserId(id);
              }
            }
          }}
        />
      ) : null}
    </div>
  );
};
