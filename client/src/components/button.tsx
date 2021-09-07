import React from 'react';
import { Button } from '@material-ui/core';

export const AppButton: React.FC<ButtonProps> = ({
  name,
  color,
  isDisabled,
  onClickHandler,
}): JSX.Element => {
  const btnStyle = color === 'white' ? 'outlined' : 'contained';

  return (
    <Button variant={btnStyle} color="primary" onClick={onClickHandler} disabled={isDisabled}>
      {name}
    </Button>
  );
};

interface ButtonProps {
  name: string;
  color?: 'white' | 'blue';
  isDisabled?: boolean;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
