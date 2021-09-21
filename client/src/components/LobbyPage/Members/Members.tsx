import { deleteUserById } from '../../../api/users.service';
import React, { useEffect, useState } from 'react';
import { Text } from '../../Text';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { getUsers } from '../../../store/actionCreators/user';
import { AppModal } from '../../modal/Modal';
import { UserCard } from '../../userCard/UserCard';
import { Roles } from '../../../types/roleType';
import styles from './Members.module.scss';

export const Members: React.FC = () => {
  const { users } = useTypeSelector(state => state.users);
  const { currentUser } = useTypeSelector(state => state.currentUser);
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
    await deleteUserById(getDeleteUserId);
    setModalShowFlag(false);
    dispatch(getUsers(currentUser.gameId));
  };

  useEffect(() => {
    dispatch(getUsers(currentUser.gameId));
  }, []);

  return (
    <>
      <Text textLvl="label" isBold={true}>
        Members:
      </Text>
      <div className={styles.container}>
        {users.map(elem => {
          return (
            <UserCard
              key={`${elem._id}`}
              name={elem.firstName}
              surname={elem.lastName}
              job={elem.jobPosition}
              id={elem._id}
              status={Roles.user}
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
