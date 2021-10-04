import React, { useEffect, useState } from 'react';
import { deleteIssueById } from 'core/api/issues.service';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { deleteIssue, getIssues, setIssue } from 'store/actionCreators/issue';
import { IssueCard } from 'core/components/issueCard/IssueCard';
import { IssueCardAdd } from 'core/components/issueCardAdd/IssueCardAdd';
import { AppModal } from 'core/components/modals/Modal';
import { Text } from 'core/components/Text';
import { CreateIssueForm } from 'core/forms/createIssueForm/CreateIssueForm';
import { socket } from 'core/api/socket.service';
import { IIssueMsg, Message } from 'core/types/socketMessageType';
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
    modalShowCreate(false);
  };

  const handleSubmitEditIssue = () => {
    modalShowEdit(false);
  };

  const handleSubmitDeleteIssue = async () => {
    deleteIssueById(getIssueId).then(() => {
      modalShowDelete(false);
    });
  };

  const handleCancel = () => {
    modalShowDelete(false);
    modalShowCreate(false);
    modalShowEdit(false);
  };

  const handleIssueId = (id: string) => {
    setIssueId(id);
  };

  useEffect(() => {
    dispatch(getIssues(currentUser.gameId));
    const socketCreateIssue = (msg: IIssueMsg) => {
      dispatch(setIssue(msg.payload));
    };
    const socketDeleteIssue = (msg: IIssueMsg) => {
      dispatch(deleteIssue(msg.payload));
    };
    socket.on(Message.createIssue, socketCreateIssue);
    socket.on(Message.deleteIssue, socketDeleteIssue);
    return () => {
      socket.off(Message.createIssue, socketCreateIssue);
      socket.off(Message.deleteIssue, socketDeleteIssue);
    };
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
