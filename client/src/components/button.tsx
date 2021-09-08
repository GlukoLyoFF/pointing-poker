import React from 'react';
import { Button } from '@material-ui/core';

export const AppButton: React.FC<ButtonProps> = ({
  name,
  color,
  isDisabled,
  isSubmit,
  idForm,
  onClickHandler,
}): JSX.Element => {
  const btnStyle = color === 'white' ? 'outlined' : 'contained';
  const btnType = isSubmit ? 'submit' : undefined;

  return (
    <Button
      variant={btnStyle}
      type={btnType}
      form={idForm}
      color="primary"
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {name}
    </Button>
  );
};

interface ButtonProps {
  name: string;
  color?: 'white' | 'blue';
  isDisabled?: boolean;
  isSubmit?: boolean;
  idForm?: string;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
