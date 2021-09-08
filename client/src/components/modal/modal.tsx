import React from 'react';
import { AppButton } from '../button';
import { Text } from '../text';
import style from './modal.module.scss';

export const Modal: React.FC<ModalProps> = ({
  title,
  isShow,
  handleSubmit,
  handleCancel,
  children,
}): JSX.Element => {
  const showHideClassName = isShow ? style.modalWrap : style.hidden;
  return (
    <div className={showHideClassName} onClick={handleCancel}>
      <div className={style.modal}>
        <Text textLvl="title" isBold={true}>
          {title}
        </Text>
        <div className={style.main}>{children}</div>
        <div className={style.buttons}>
          <AppButton name="Confirm" onClickHandler={handleSubmit} />
          <AppButton name="Cancel" color="white" onClickHandler={handleCancel} />
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  title: string;
  isShow: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}
