import React from 'react';

export const Text: React.FC<TextProps> = ({
  textLvl,
  isHighlight,
  isBold,
  className,
  children,
  id,
}): JSX.Element => {
  const generateClassName = (): string => {
    return `${className} text ${textLvl} ${isHighlight ? 'colored' : ''} ${isBold ? 'bold' : ''}`;
  };

  return (
    <span className={generateClassName()} id={id}>
      {children}
    </span>
  );
};

interface TextProps {
  textLvl: 'title' | 'subtitle' | 'base' | 'label' | 'comment' | 'error';
  isHighlight?: boolean;
  isBold?: boolean;
  className?: string;
  id?: string;
}
