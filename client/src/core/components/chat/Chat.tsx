import { User } from 'core/types/userType';
import { AddMessageForm } from './addMsgForm/AddMsgForm';
import { Messages } from './messages/Messages';
import styles from './Chat.module.scss';

export type ChatMessageType = {
  user: User;
  message: string;
};

export const Chat: React.FC = () => {
  return (
    <div className={styles.chat}>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
