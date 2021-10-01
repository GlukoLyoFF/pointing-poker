import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import EditIcon from '@material-ui/icons/Edit';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React, { useState } from 'react';
import style from './GameCard.module.scss';
import { TextField } from '@material-ui/core';
import { Text } from '../Text';

export const GameCard: React.FC<GameCardProps> = ({
  type,
  value,
  editable,
  isSelected,
  keyCard,
  onClickHandler,
  onChangeValue,
  onRemoveCard,
}) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const cardContent = (
    <>
      <TextField
        id={`game-card-${value}`}
        value={value ? value : 'Undefined'}
        disabled={!isEdit}
        onChange={onChangeValue}
        className={style.topLeft}
      />
      {editable && onRemoveCard ? (
        <div className={style.btnsWrap}>
          <EditIcon className={style.editBtn} onClick={() => setIsEdit(!isEdit)} />
          <DeleteOutlineIcon className={style.removeBtn} onClick={onRemoveCard} />
        </div>
      ) : (
        ''
      )}
      {Number(value) ? (
        <span className={style.cardText}>{type}</span>
      ) : (
        <LocalCafeIcon className={style.cardText} />
      )}
      <Text textLvl="comment" className={style.bottomRight}>
        {value ? value : 'Undefined'}
      </Text>
    </>
  );

  const overlay = (
    <div className={style.cardOverlay}>
      <OfflinePinIcon className={style.cardIcon} />
    </div>
  );
  return (
    <div
      className={style.gameCard}
      onClick={() => {
        if (onClickHandler) {
          if (keyCard && value) {
            onClickHandler(keyCard, value);
          }
        }
      }}
    >
      {cardContent}
      {isSelected ? overlay : ''}
    </div>
  );
};

interface GameCardProps {
  type: string;
  value: string;
  editable?: boolean;
  isSelected?: boolean;
  keyCard?: string;
  onClickHandler?: (key: string, value: string) => void;
  onChangeValue?: React.ChangeEventHandler;
  onRemoveCard?: React.MouseEventHandler;
}
