import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from 'react';
import style from './GameCard.module.scss';

export const AddGameCard: React.FC<AddGameCardProps> = ({ onClick }): JSX.Element => {
  return (
    <div className={style.gameCard} onClick={onClick}>
      <AddCircleOutlineIcon className={style.cardText} />
    </div>
  );
};

interface AddGameCardProps {
  onClick: () => void;
}
