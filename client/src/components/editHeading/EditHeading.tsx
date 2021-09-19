import React, { useRef, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { setHeading } from '../../store/actionCreators/heading';
import styles from './EditHeading.module.scss';

export const EditHeading: React.FC = () => {
  const dispatch = useDispatch();
  const [getInputValue, setInputValue] = useState('');
  const [isInputDisabledValue, setInputDsiabledValue] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDisabledValue = (value: boolean) => {
    setInputDsiabledValue(value);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        ref={inputRef}
        value={getInputValue}
        type="text"
        onChange={event => setInputValue(event.target.value)}
        disabled={isInputDisabledValue}
        onBlur={() => {
          handleDisabledValue(true);
          dispatch(setHeading({ _id: '123', heading: `${getInputValue}`, gameId: '1234' }));
        }}
      />
      <EditIcon
        className={styles.editBtn}
        onClick={() => {
          handleDisabledValue(false);
          setTimeout(() => {
            handleFocus();
          }, 0);
        }}
      />
    </div>
  );
};
