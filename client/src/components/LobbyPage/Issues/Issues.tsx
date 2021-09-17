import React, { useEffect, useState } from 'react';
import axios from '../../../services/api';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { getIssues } from '../../../store/actionCreators/issue';
import { IssueCard } from '../../issueCard/IssueCard';
import { IssueCardAdd } from '../../issueCardAdd/IssueCardAdd';
import { AppModal } from '../../modal/Modal';
import { Text } from '../../Text';
import { CreateIssueForm } from '../../createIssueForm/CreateIssueForm';
import styles from './Issues.module.scss';

export const Issues: React.FC = () => {
  const state = useTypeSelector(issues => issues.issues);
  const dispatch = useDispatch();
  const [getModalShowDeleteFlag, setModalShowDeleteFlag] = useState(false);
  const [getModalShowCreateFlag, setModalShowCreateFlag] = useState(false);
  const [getModalShowEditFlag, setModalShowEditFlag] = useState(false);
  const [getIssueId, setIssueId] = useState('');

  const modalShowDelete = (flag: boolean) => {
    setModalShowDeleteFlag(flag);
  };

  const modalShowEdit = (flag: boolean) => {
    setModalShowEditFlag(flag);
  };

  const modalShowCreate = (flag: boolean) => {
    setModalShowCreateFlag(flag);
  };

  const handleSubmitCreateIssue = () => {
    dispatch(getIssues());
    modalShowCreate(false);
  };

  const handleSubmitEditIssue = () => {
    dispatch(getIssues());
    modalShowEdit(false);
  };

  const handleSubmitDeleteIssue = async () => {
    await axios.delete(`issues/${getIssueId}`);
    modalShowDelete(false);
    dispatch(getIssues());
  };

  const handleCancel = () => {
    modalShowDelete(false);
    modalShowCreate(false);
    modalShowEdit(false);
    dispatch(getIssues());
  };

  const handleIssueId = (id: string) => {
    setIssueId(id);
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
              modalShowDelete={modalShowDelete}
              modalShowEdit={modalShowEdit}
              handleIssueId={handleIssueId}
            />
          );
        })}
        <IssueCardAdd modalShow={modalShowCreate} setCreateFormFlag={modalShowCreate} />
        <AppModal
          title={`Delete issue?`}
          isShow={getModalShowDeleteFlag}
          handleSubmit={handleSubmitDeleteIssue}
          handleCancel={handleCancel}
          children={`Are you really want to remove this issue from game session?`}
        />
        <CreateIssueForm
          id={getIssueId}
          flagEdit={getModalShowEditFlag}
          flagCreate={getModalShowCreateFlag}
          isShow={!getModalShowEditFlag ? getModalShowCreateFlag : getModalShowEditFlag}
          handleSubmitFrom={getModalShowEditFlag ? handleSubmitEditIssue : handleSubmitCreateIssue}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
};
