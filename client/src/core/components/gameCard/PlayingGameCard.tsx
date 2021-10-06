import { socket } from 'core/api/socket.service';
import { ITimerMsg, Message } from 'core/types/socketMessageType';
import React from 'react';
import { GameCard } from './GameCard';

export const PlayingGameCard: React.FC<PlayingGameCardProps> = (props): JSX.Element => {
  const { keyCard, value, onClick, isClick } = props;
  const [isGreen, setIsGreen] = React.useState<boolean>(false);

  React.useEffect(() => {
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
    <GameCard
      isSelected={isGreen}
      {...props}
      onClickHandler={() => {
        if (isClick) {
          onClick(keyCard, value);
          setIsGreen(true);
        }
      }}
    />
  );
};

interface PlayingGameCardProps {
  type: string;
  value: string;
  keyCard: string;
  onClick: (key: string, value: string) => void;
  isClick?: boolean;
}
