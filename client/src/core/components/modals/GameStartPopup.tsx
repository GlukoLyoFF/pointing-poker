import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { AppButton } from 'core/components/Button';
import { Text } from 'core/components/Text';
import React from 'react';

export const GameStartPopup: React.FC<GameStartProps> = (props): JSX.Element => {
  const { isOpen, handleCancel, handleStart, error } = props;
  const title = error ? "Can't start" : 'Start';
  const message = error ? error : 'Do you really want to start?';
  return (
    <Dialog open={isOpen} onClose={handleCancel}>
      <DialogTitle>
        <Text textLvl="title">{title}</Text>
      </DialogTitle>
      <DialogContent>
        <Text textLvl="base">{message}</Text>
      </DialogContent>
      {!error ? (
        <DialogActions style={{ margin: '10px', justifyContent: 'space-between' }}>
          <AppButton name="Start" onClickHandler={handleStart} />
          <AppButton name="Cancel" color="white" onClickHandler={handleCancel} />
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

interface GameStartProps {
  isOpen: boolean;
  handleCancel: () => void;
  handleStart: () => void;
  error: string;
}
