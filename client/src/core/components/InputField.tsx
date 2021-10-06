import React from 'react';
import style from '../../app.module.scss';
import { Text } from 'core/components/Text';

export const InputField: React.FC<InputProps> = ({
  onChange,
  name,
  labelText,
  ...rest
}): JSX.Element => {
  return (
    <label htmlFor={name} className={style.inputContainer}>
      <Text textLvl="base" className={style.inputLabel}>
        {labelText}
      </Text>
      <input
        name={name}
        className={style.inputField}
        onChange={({ target: { value } }: InputChangeEvent) => onChange(value)}
        {...rest}
      />
    </label>
  );
};

type InputElement = HTMLInputElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;
interface InputProps {
  name: string;
  value: string;
  labelText?: string | React.ReactElement;
  onChange: (val: string) => void;
  type?: 'email' | 'text';
  readOnly?: boolean;
}
