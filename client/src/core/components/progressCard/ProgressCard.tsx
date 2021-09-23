import React from 'react';
import { Text } from 'core/components/Text';
import styles from './ProgressCard.module.scss';

export const ProgressCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <Text textLvl="label" isBold={true}>
        In progress
      </Text>
    </div>
  );
};
