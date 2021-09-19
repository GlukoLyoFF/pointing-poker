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

interface IssuesProps {
  gameId: string;
}

export const Issues: React.FC<IssuesProps> = ({ gameId }) => {
  const state = useTypeSelector(issues => issues.issues);
  const dispatch = useDispatch();
  const [isModalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [isModalVisibleCreate, setModalVisibleCreate] = useState(false);
  const [isModalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [getIssueId, setIssueId] = useState('');

  const modalShowDelete = (flag: boolean) => {
    setModalVisibleDelete(flag);
  };

  const modalShowEdit = (flag: boolean) => {
    setModalVisibleEdit(flag);
  };

  const modalShowCreate = (flag: boolean) => {
    setModalVisibleCreate(flag);
  };

  const handleSubmitCreateIssue = () => {
    dispatch(getIssues(gameId));
    modalShowCreate(false);
  };

  const handleSubmitEditIssue = () => {
    dispatch(getIssues(gameId));
    modalShowEdit(false);
  };

  const handleSubmitDeleteIssue = async () => {
    await axios.delete(`issues/${getIssueId}`);
    modalShowDelete(false);
    dispatch(getIssues(gameId));
  };

  const handleCancel = () => {
    modalShowDelete(false);
    modalShowCreate(false);
    modalShowEdit(false);
    dispatch(getIssues(gameId));
  };

  const handleIssueId = (id: string) => {
    setIssueId(id);
  };

  useEffect(() => {
    dispatch(getIssues(gameId));
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
          isShow={isModalVisibleDelete}
          handleSubmit={handleSubmitDeleteIssue}
          handleCancel={handleCancel}
          children={`Are you really want to remove this issue from game session?`}
        />
        <CreateIssueForm
          id={getIssueId}
          flagEdit={isModalVisibleEdit}
          flagCreate={isModalVisibleCreate}
          isShow={isModalVisibleEdit || isModalVisibleCreate}
          handleSubmitFrom={isModalVisibleEdit ? handleSubmitEditIssue : handleSubmitCreateIssue}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
};
