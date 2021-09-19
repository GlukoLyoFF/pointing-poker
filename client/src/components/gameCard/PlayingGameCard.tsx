import React from 'react';
import { GameCard } from './GameCard';

export const PlayingGameCard: React.FC<PlayingGameCardProps> = ({ ...rest }): JSX.Element => {
  return <GameCard {...rest} />;
};

interface PlayingGameCardProps {
  type: string;
  value: string;
  isSelected?: boolean;
  onClick: React.MouseEventHandler;
}
