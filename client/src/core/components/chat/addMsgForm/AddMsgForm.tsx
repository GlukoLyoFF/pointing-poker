import { TextField } from '@material-ui/core';
import { sendUserMessage } from 'core/api/socket.service';
import { AppButton } from 'core/components/Button';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { useState } from 'react';
import styles from './AddMsgForm.module.scss';

export const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const sendMessage = () => {
    sendUserMessage({ userId: currentUser.userId, message: message });
    setMessage('');
  };

  return (
    <div>
      <TextField
        className={styles.textField}
        color="primary"
        multiline
        rows={2}
        rowsMax={4}
        onChange={e => setMessage(e.currentTarget.value)}
        value={message}
      />
      <div className={styles.btn}>
        <AppButton name="send" onClickHandler={sendMessage} />
      </div>
    </div>
  );
};
