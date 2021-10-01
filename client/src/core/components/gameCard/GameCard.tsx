import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import EditIcon from '@material-ui/icons/Edit';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React, { useEffect, useState } from 'react';
import style from './GameCard.module.scss';
import { TextField } from '@material-ui/core';
import { Text } from '../Text';
import { ITimerMsg, Message } from 'core/types/socketMessageType';
import { socket } from 'core/api/socket.service';

export const GameCard: React.FC<GameCardProps> = ({
  type,
  value,
  editable,
  isSelected,
  keyCard,
  isClick,
  onClickHandler,
  onChangeValue,
  onRemoveCard,
}) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isGreen, setIsGreen] = useState(false);
  const cardStyle = isGreen ? `${style.gameCard} ${style.green}` : `${style.gameCard}`;
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

  useEffect(() => {
    const changeBackground = (msg: ITimerMsg) => {
      if (msg.payload === 'start') {
        setIsGreen(false);
      } else if (msg.payload === 'restart') {
        setIsGreen(false);
      }
    };
    socket.on(Message.startRound, changeBackground);
    socket.on(Message.restartRound, changeBackground);
    return () => {
      socket.off(Message.startRound, changeBackground);
      socket.off(Message.restartRound, changeBackground);
    };
  }, []);

  return (
    <div
      className={cardStyle}
      onClick={() => {
        if (onClickHandler && isClick) {
          if (keyCard && value) {
            onClickHandler(keyCard, value);
            setIsGreen(true);
          }
        } else {
          return;
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
  isClick?: boolean;
  onClickHandler?: (key: string, value: string) => void;
  onChangeValue?: React.ChangeEventHandler;
  onRemoveCard?: React.MouseEventHandler;
}
