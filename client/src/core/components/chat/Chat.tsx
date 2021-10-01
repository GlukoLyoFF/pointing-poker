import { socket } from 'core/api/socket.service';
import { deleteUserById } from 'core/api/users.service';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { IUserMsg, Message } from 'core/types/socketMessageType';
import { User } from 'core/types/userType';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import { deleteUser, getUsers, setUser } from 'store/actionCreators/user';
import { AppModal } from '../modal/Modal';
import { UserCard } from '../userCard/UserCard';
import { Text } from '../Text';

export type ChatMessageType = {
  user: User;
  message: string;
};

interface IPayload<T> {
  event: string;
  payload: T;
}

export const Msg: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const [getDeleteUserId, setDeleteUserId] = useState('');
  const { users } = useTypeSelector(state => state.users);
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
      dispatch(clearCurrentUser(msg.payload));
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
    <>
      <Text textLvl={'base'}>{`${message.message}`}</Text>
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
      <AppModal
        title={`Kick player?`}
        isShow={getModalShowFlag}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        children={`Are you really want to remove player ${getDeleteUserName} from game session?`}
      />
    </>
  );
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  useEffect(() => {
    socket.on('msgToClient', data => {
      console.log(data.payload.user.gameId === currentUser.gameId);
      if (data.payload.user.gameId === currentUser.gameId)
        setMessages(prevMsg => [...prevMsg, data.payload]);
    });
  }, []);

  return (
    <div
      style={{
        height: '400px',
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {messages.map((m: ChatMessageType, index) => (
        <Msg message={m} key={index} />
      ))}
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const sendMessage = () => {
    socket.emit('msgToServer', { userId: currentUser.userId, message: message });
    setMessage('');
  };
  return (
    <div>
      <div>
        <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export const Chat: React.FC = () => {
  useEffect(() => {
    socket.on('chooseIssue', data => console.log(typeof data));
  }, []);
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
