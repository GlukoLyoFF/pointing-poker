import React from 'react';

export const Text: React.FC<TextProps> = ({
  textLvl,
  isHighlight,
  isBold,
  className,
  children,
}): JSX.Element => {
  const generateClassName = (): string => {
    return `${className} text-${textLvl} ${isHighlight ? 'colored' : ''} ${isBold ? 'bold' : ''}`;
  };

  return <span className={generateClassName()}>{children}</span>;
};

interface TextProps {
  textLvl: 'title' | 'subtitle' | 'base' | 'label' | 'comment' | 'error';
  isHighlight?: boolean;
  isBold?: boolean;
  className?: string;
}
