import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from '../Text';
import styles from './IssueCard.module.scss';

interface IssueCardProp {
  title: string;
  priority: string;
  id: string;
  modalShowDelete?: (flag: boolean) => void;
  modalShowEdit?: (flag: boolean) => void;
  handleIssueId: (id: string) => void;
  gameMode?: boolean;
  currentIssueId?: string;
}

export const IssueCard: React.FC<IssueCardProp> = ({
  title,
  priority,
  id,
  modalShowDelete,
  modalShowEdit,
  handleIssueId,
  gameMode,
  currentIssueId,
}) => {
  const className = currentIssueId !== id ? `${styles.issue}` : `${styles.issue} ${styles.green}`;

  return (
    <div className={className} onClick={() => handleIssueId(id)}>
      <div className={styles.title}>
        <Text textLvl={'base'}>{title}</Text>
        <div className={styles.priority}>
          <Text textLvl={'comment'}>{priority} priority</Text>
        </div>
      </div>
      <div>
        {gameMode ? (
          <CloseIcon className={styles.btn} />
        ) : (
          <>
            <EditIcon
              className={styles.btn}
              onClick={() => {
                if (modalShowEdit) {
                  modalShowEdit(true);
                }
                handleIssueId(id);
              }}
            />
            <DeleteOutlineIcon
              className={styles.btn}
              onClick={() => {
                if (modalShowDelete) {
                  modalShowDelete(true);
                }
                handleIssueId(id);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
