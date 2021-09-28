import React, { useRef, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { postGameHeader, setGameTitle } from 'store/actionCreators/gameInfo';
import styles from './EditHeading.module.scss';

export const EditHeading: React.FC = () => {
  const { gameInfo } = useTypeSelector(state => state.gameInfo);
  const dispatch = useDispatch();
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const [getInputValue, setInputValue] = useState('');
  const [isInputDisabledValue, setInputDsiabledValue] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDisabledValue = (value: boolean) => {
    setInputDsiabledValue(value);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleChangeTitle = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setGameTitle(target.value));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        ref={inputRef}
        value={getInputValue}
        type="text"
        onChange={handleChangeTitle}
        disabled={isInputDisabledValue}
        onBlur={() => {
          handleDisabledValue(true);
          dispatch(
            postGameHeader({
              _id: gameInfo._id,
              title: gameInfo.title,
              url: gameInfo.url,
            }),
          );
        }}
      />
      {currentUser.role === Roles.creator ? (
        <EditIcon
          className={styles.editBtn}
          onClick={() => {
            handleDisabledValue(false);
            setTimeout(() => {
              handleFocus();
            }, 0);
          }}
        />
      ) : null}
    </div>
  );
};
