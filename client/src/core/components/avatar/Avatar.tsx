import React, { FC } from 'react';
import styles from './Avatar.module.scss';

export const Avatar: FC<AvatarProps> = ({ img, name, lastName }) => {
  const letters = (ftName: string, sndName: string): string => {
    const firstName = ftName?.trim() || '';
    const secondName = sndName?.trim() || '';

    if (secondName == '' && firstName == '') return '+';
    if (secondName == '' && firstName.length > 2)
      return `${firstName.substr(0, 1)}${firstName.substr(2, 1)}`.toUpperCase();
    if (secondName == '' && firstName.length <= 2) return `${firstName.substr(0, 1)}`.toUpperCase();
    return `${firstName.substr(0, 1)}${secondName.substr(0, 1)}`.toUpperCase();
  };

  return (
    <div className={styles.avatar}>
      {img != '' ? <img width="120" height="120" src={img} /> : <h3>{letters(name, lastName)}</h3>}
    </div>
  );
};

interface AvatarProps {
  img: string;
  name: string;
  lastName: string;
}
