import { deleteUserById } from '../../../core/api/users.service';
import React, { useEffect, useState } from 'react';
import { Text } from '../../../core/components/Text';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../core/hooks/useTypeSelector';
import { deleteUser, getUsers, setUser } from '../../../store/actionCreators/user';
import { AppModal } from '../../../core/components/modal/Modal';
import { UserCard } from '../../../core/components/userCard/UserCard';
import { Roles } from '../../../core/types/roleType';
import styles from './Members.module.scss';
import { Message } from 'core/types/socketMessageType';
import { socket } from 'core/api/socket.service';
import { clearCurrentUser } from 'store/actionCreators/currentUser';

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

  const handleSubmit = () => {
    deleteUserById(getDeleteUserId);
    setModalShowFlag(false);
  };

  useEffect(() => {
    dispatch(getUsers(currentUser.gameId));
    socket.on(Message.deleteUser, msg => {
      dispatch(deleteUser(msg.payload));
      dispatch(clearCurrentUser(msg.payload));
    });
    socket.on(Message.createUser, msg => {
      dispatch(setUser(msg.payload));
    });
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
