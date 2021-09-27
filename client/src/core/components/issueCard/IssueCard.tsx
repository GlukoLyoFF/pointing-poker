import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from '../Text';
import styles from './IssueCard.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { deleteIssueById } from 'core/api/issues.service';
import { useDispatch } from 'react-redux';

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
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const className = currentIssueId !== id ? `${styles.issue}` : `${styles.issue} ${styles.green}`;

  return (
    <div className={styles.issue}>
      <div className={styles.title}>
        <Text textLvl={'base'}>{title}</Text>
        <div className={styles.priority}>
          <Text textLvl={'comment'}>{priority} priority</Text>
        </div>
      </div>
      <div>
        {gameMode && currentUser.role === Roles.creator ? (
          <CloseIcon className={styles.btn} onClick={() => deleteIssueById(id)} />
        ) : null}
        {!gameMode ? (
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
        ) : null}
      </div>
    </div>
  );
};
