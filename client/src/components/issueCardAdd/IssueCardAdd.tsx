import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Text } from '../Text';
import styles from './IssueCardAdd.module.scss';

export const IssueCardAdd: React.FC = () => {
  return (
    <div className={styles.issue}>
      <div className={styles.title}>
        <Text textLvl={'base'}>Create new Issue</Text>
      </div>
      <AddIcon className={styles.btn} />
    </div>
  );
};
