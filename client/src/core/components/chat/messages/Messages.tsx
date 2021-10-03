import { socket } from 'core/api/socket.service';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Message } from 'core/types/socketMessageType';
import { useEffect, useState } from 'react';
import { ChatMessageType } from '../Chat';
import { Msg } from '../msg/Msg';
import styles from './Messages.module.scss';

export const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  useEffect(() => {
    socket.on(Message.deleteUser, data => {
      if (data.payload.gameId === currentUser.gameId)
        setMessages(prevMsg =>
          [...prevMsg].filter((msg: ChatMessageType) => msg.user._id !== data.payload._id),
        );
    });
    socket.on('msgToClient', data => {
      if (data.payload.user.gameId === currentUser.gameId)
        setMessages(prevMsg => [...prevMsg, data.payload]);
    });
  }, []);

  return (
    <div className={styles.msgs}>
      {messages.map((m: ChatMessageType, index) => (
        <Msg message={m} key={index} />
      ))}
    </div>
  );
};
