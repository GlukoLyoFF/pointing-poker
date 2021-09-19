import axios from '../../../services/api';
import React, { useEffect, useState } from 'react';
import { Text } from '../../Text';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { getUsers } from '../../../store/actionCreators/user';
import { AppModal } from '../../modal/Modal';
import { UserCard } from '../../userCard/UserCard';
import styles from './Members.module.scss';

interface MembersProps {
  gameId: string;
  role: string;
  userId: string;
}

export const Members: React.FC<MembersProps> = ({ gameId, role, userId }) => {
  const state = useTypeSelector(users => users.users);
  const dispatch = useDispatch();
  const [getModalShowFlag, setModalShowFlag] = useState(false);
  const [getDeleteUserName, setDeleteUserName] = useState('');
  const [getDeleteUserId, setDeleteUserId] = useState('');

  const handleFlag = (flag: boolean) => {
    setModalShowFlag(flag);
  };

  const handleUserName = (name: string) => {
    setDeleteUserName(name);
  };

  const handleCancel = () => {
    handleFlag(false);
  };

  const handleUserId = (id: string) => {
    setDeleteUserId(id);
  };

  const handleSubmit = async () => {
    await axios.delete(`users/${getDeleteUserId}`);
    setModalShowFlag(false);
    dispatch(getUsers('asdfasdfas'));
  };

  useEffect(() => {
    dispatch(getUsers('asdfasdfas'));
  }, []);

  return (
    <>
      <Text textLvl="label" isBold={true}>
        Members:
      </Text>
      <div className={styles.container}>
        {state.users.map(elem => {
          return (
            <UserCard
              key={`${elem._id}`}
              name={elem.firstName}
              surname={elem.lastName}
              job={elem.jobPosition}
              id={elem._id}
              status={'user'}
              handleFlag={handleFlag}
              handleUserName={handleUserName}
              handleUserId={handleUserId}
              image={elem.image ? elem.image : ''}
            />
          );
        })}
        <AppModal
          title={`Kick player?`}
          isShow={getModalShowFlag}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          children={`Are you really want to remove player ${getDeleteUserName} from game session?`}
        />
      </div>
    </>
  );
};
