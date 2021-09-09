import React from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { AppButton } from '../Button';
import { Text } from '../Text';

export const AppModal: React.FC<ModalProps> = ({
  title,
  isShow,
  handleSubmit,
  handleCancel,
  children,
}): JSX.Element => {
  const dialogLabel = `${title.toLocaleLowerCase().split(' ').join('-')}-dialog-title`;

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isShow}
        onClose={handleCancel}
        aria-labelledby={dialogLabel}
        style={{ paddingTop: '20px' }}
      >
        <Text textLvl="title" isBold={true} id={dialogLabel}>
          {title}
        </Text>
        <DialogContent>{children}</DialogContent>
        <DialogActions style={{ margin: '10px', justifyContent: 'space-between' }}>
          <AppButton name="Confirm" onClickHandler={handleSubmit} />
          <AppButton name="Cancel" color="white" onClickHandler={handleCancel} />
        </DialogActions>
      </Dialog>
    </>
  );
};

interface ModalProps {
  title: string;
  isShow: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}
