import React, { useEffect, useState } from 'react';
import { deleteIssueById } from 'core/api/issues.service';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { getIssues } from 'store/actionCreators/issue';
import { IssueCard } from 'core/components/issueCard/IssueCard';
import { IssueCardAdd } from 'core/components/issueCardAdd/IssueCardAdd';
import { AppModal } from 'core/components/modal/Modal';
import { Text } from 'core/components/Text';
import { CreateIssueForm } from 'core/forms/createIssueForm/CreateIssueForm';
import styles from './Issues.module.scss';

export const Issues: React.FC = () => {
  const { issues } = useTypeSelector(state => state.issues);
  const { currentUser } = useTypeSelector(state => state.currentUser);
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
    dispatch(getIssues(currentUser.gameId));
    modalShowCreate(false);
  };

  const handleSubmitEditIssue = () => {
    dispatch(getIssues(currentUser.gameId));
    modalShowEdit(false);
  };

  const handleSubmitDeleteIssue = async () => {
    deleteIssueById(getIssueId).then(() => {
      modalShowDelete(false);
      dispatch(getIssues(currentUser.gameId));
    });
  };

  const handleCancel = () => {
    modalShowDelete(false);
    modalShowCreate(false);
    modalShowEdit(false);
    dispatch(getIssues(currentUser.gameId));
  };

  const handleIssueId = (id: string) => {
    setIssueId(id);
  };

  useEffect(() => {
    dispatch(getIssues(currentUser.gameId));
  }, []);
  return (
    <>
      <Text textLvl="label" isBold={true}>
        Issues:
      </Text>
      <div className={styles.container}>
        {issues.map(elem => {
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
