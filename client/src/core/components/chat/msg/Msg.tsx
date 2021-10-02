import { socket } from 'core/api/socket.service';
import { deleteUserById } from 'core/api/users.service';
import { AppModal } from 'core/components/modal/Modal';
import { UserCard } from 'core/components/userCard/UserCard';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { IUserMsg, Message } from 'core/types/socketMessageType';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import { deleteUser, getUsers, setUser } from 'store/actionCreators/user';
import { Text } from '../../Text';
import { ChatMessageType } from '../Chat';
import styles from './Msg.module.scss';

export const Msg: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const [getDeleteUserId, setDeleteUserId] = useState('');
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const [getModalShowFlag, setModalShowFlag] = useState(false);
  const [getDeleteUserName, setDeleteUserName] = useState('');

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
    const socketSetUser = (msg: IUserMsg) => {
      dispatch(setUser(msg.payload));
    };
    const socketDeleteUser = (msg: IUserMsg) => {
      dispatch(deleteUser(msg.payload));
      if (msg.payload._id === currentUser.userId) {
        dispatch(clearCurrentUser(currentUser));
      }
    };
    dispatch(getUsers(currentUser.gameId));
    socket.on(Message.deleteUser, socketDeleteUser);
    socket.on(Message.createUser, socketSetUser);
    return () => {
      socket.off(Message.createUser, socketSetUser);
      socket.off(Message.deleteUser, socketDeleteUser);
    };
  }, []);
  return (
    <div className={styles.msg}>
      <Text className={styles.message} textLvl={'base'}>{`${message.message}`}</Text>
      <div className={styles.card}>
        <UserCard
          key={`${message.user._id}`}
          name={message.user.firstName}
          surname={message.user.lastName}
          job={message.user.jobPosition}
          id={message.user._id}
          status={message.user.role}
          handleFlag={handleFlag}
          handleUserName={handleUserName}
          handleUserId={handleUserId}
          image={message.user.image ? message.user.image : ''}
        />
      </div>
      <AppModal
        title={`Kick player?`}
        isShow={getModalShowFlag}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        children={`Are you really want to remove player ${getDeleteUserName} from game session?`}
      />
    </div>
  );
};
