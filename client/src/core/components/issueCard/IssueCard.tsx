import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from 'core/components/Text';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { Roles } from 'core/types/roleType';
import { deleteIssueById } from 'core/api/issues.service';
import styles from './IssueCard.module.scss';
interface IssueCardProp {
  title: string;
  priority: string;
  id: string;
  modalShowDelete?: (flag: boolean) => void;
  modalShowEdit?: (flag: boolean) => void;
  handleIssueId: (id: string) => void;
  gameMode?: boolean;
  resultMode?: boolean;
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
  resultMode,
  currentIssueId,
}) => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const className = currentIssueId !== id ? `${styles.issue}` : `${styles.issue} ${styles.green}`;

  const handleEditIssue = () => {
    if (modalShowEdit) {
      modalShowEdit(true);
    }
    handleIssueId(id);
  };

  const handleDeleteIssue = () => {
    if (modalShowDelete) {
      modalShowDelete(true);
    }
    handleIssueId(id);
  };

  const issueBtns = (): JSX.Element => {
    if (!resultMode && gameMode && currentUser.role === Roles.creator) {
      return <CloseIcon className={styles.btn} onClick={() => deleteIssueById(id)} />;
    } else if (!resultMode && !gameMode) {
      return (
        <>
          <EditIcon className={styles.btn} onClick={handleEditIssue} />
          <DeleteOutlineIcon className={styles.btn} onClick={handleDeleteIssue} />
        </>
      );
    }
    return <></>;
  };

  return (
    <div className={className}>
      <div className={styles.title}>
        <Text textLvl={'base'}>{title}</Text>
        <div className={styles.priority}>
          <Text textLvl={'comment'}>{priority} priority</Text>
        </div>
      </div>
      <div>{issueBtns()}</div>
    </div>
  );
};
