import React, { useEffect, useState } from 'react';
import axios from '../../../services/api';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { getIssues } from '../../../store/actionCreators/issue';
import { IssueCard } from '../../issueCard/IssueCard';
import { IssueCardAdd } from '../../issueCardAdd/IssueCardAdd';
import { AppModal } from '../../modal/Modal';
import { Text } from '../../Text';
import styles from './Issues.module.scss';

export const Issues: React.FC = () => {
  const state = useTypeSelector(issues => issues.issues);
  const dispatch = useDispatch();
  const [getModalShowFlag, setModalShowFlag] = useState(false);
  const [getDeleteIssueId, setDeleteIssueId] = useState('');

  const handleFlag = (flag: boolean) => {
    setModalShowFlag(flag);
  };

  const handleSubmit = async () => {
    await axios.delete(`issues/${getDeleteIssueId}`);
    handleFlag(false);
    dispatch(getIssues());
  };

  const handleCancel = () => {
    handleFlag(false);
  };

  const handleIssueId = (id: string) => {
    setDeleteIssueId(id);
  };

  useEffect(() => {
    dispatch(getIssues());
  }, []);
  return (
    <>
      <Text textLvl="label" isBold={true}>
        Issues:
      </Text>
      <div className={styles.container}>
        {state.issues.map(elem => {
          return (
            <IssueCard
              key={`${elem._id}`}
              title={elem.title}
              priority={elem.priority}
              id={elem._id}
              handleFlag={handleFlag}
              handleIssueId={handleIssueId}
            />
          );
        })}
        <IssueCardAdd />
        <AppModal
          title={`Delete issue?`}
          isShow={getModalShowFlag}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          children={`Are you really want to remove this issue from game session?`}
        />
      </div>
    </>
  );
};
