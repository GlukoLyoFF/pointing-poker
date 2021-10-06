import React from 'react';
import { GameCard } from './GameCard';

export const EditableGameCard: React.FC<EditableGameCardProps> = ({ ...rest }): JSX.Element => {
  return <GameCard editable={true} {...rest} />;
};

interface EditableGameCardProps {
  type: string;
  value: string;
  onChangeValue: React.ChangeEventHandler;
  onRemoveCard: React.MouseEventHandler;
}
