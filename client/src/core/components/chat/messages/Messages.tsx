import { socket } from 'core/api/socket.service';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { useEffect, useState } from 'react';
import { ChatMessageType } from '../Chat';
import { Msg } from '../msg/Msg';
import { IUserMsg, IChatMsg, Message } from 'core/types/socketMessageType';
import styles from './Messages.module.scss';

export const Messages: React.FC = (): JSX.Element => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const socketDeleteUser = (data: IUserMsg) => {
    if (data.payload.gameId === currentUser.gameId) {
      setMessages(prevMsg =>
        [...prevMsg].filter((msg: ChatMessageType) => msg.user._id !== data.payload._id),
      );
    }
  };
  const socketCatchChatMsg = (data: IChatMsg) => {
    if (data.payload.user.gameId === currentUser.gameId) {
      setMessages(prevMsg => [...prevMsg, data.payload]);
    }
  };

  useEffect(() => {
    socket.on(Message.deleteUser, socketDeleteUser);
    socket.on('msgToClient', socketCatchChatMsg);
    return () => {
      socket.off(Message.deleteUser, socketDeleteUser);
      socket.off('msgToClient', socketCatchChatMsg);
    };
  }, []);

  return (
    <div className={styles.msgs}>
      {messages.map((m: ChatMessageType, index) => (
        <Msg message={m} key={index} />
      ))}
    </div>
  );
};
