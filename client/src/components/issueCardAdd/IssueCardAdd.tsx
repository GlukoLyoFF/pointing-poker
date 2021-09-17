import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Text } from '../Text';
import styles from './IssueCardAdd.module.scss';

interface IssueCardAddProp {
  modalShow: (flag: boolean) => void;
  setCreateFormFlag: (flag: boolean) => void;
}

export const IssueCardAdd: React.FC<IssueCardAddProp> = ({ modalShow, setCreateFormFlag }) => {
  return (
    <div className={styles.issue}>
      <div className={styles.title}>
        <Text textLvl={'base'}>Create new Issue</Text>
      </div>
      <AddIcon
        className={styles.btn}
        onClick={() => {
          setCreateFormFlag(true);
          modalShow(true);
        }}
      />
    </div>
  );
};
