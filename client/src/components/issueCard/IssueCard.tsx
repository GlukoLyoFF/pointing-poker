import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Text } from '../Text';
import styles from './IssueCard.module.scss';

interface IssueCardProp {
  title: string;
  priority: string;
  id: string;
  handleFlag: (flag: boolean) => void;
  handleIssueId: (id: string) => void;
}

export const IssueCard: React.FC<IssueCardProp> = ({
  title,
  priority,
  id,
  handleFlag,
  handleIssueId,
}) => {
  return (
    <div className={styles.issue}>
      <div className={styles.title}>
        <Text textLvl={'base'}>{title}</Text>
        <div className={styles.priority}>
          <Text textLvl={'comment'}>{priority} priority</Text>
        </div>
      </div>
      <div>
        <EditIcon className={styles.btn} />
        <DeleteOutlineIcon
          className={styles.btn}
          onClick={() => {
            handleFlag(true);
            handleIssueId(id);
          }}
        />
      </div>
    </div>
  );
};
