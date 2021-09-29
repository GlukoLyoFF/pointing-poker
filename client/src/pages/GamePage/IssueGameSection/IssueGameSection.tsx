import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Roles } from 'core/types/roleType';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { deleteIssue, getIssues, setIssue } from 'store/actionCreators/issue';
import { setSettingRoundTime } from 'store/actionCreators/gameInfo';
import { AppButton } from 'core/components/Button';
import { CreateIssueForm } from 'core/forms/createIssueForm/CreateIssueForm';
import { IssueCard } from 'core/components/issueCard/IssueCard';
import { IssueCardAdd } from 'core/components/issueCardAdd/IssueCardAdd';
import { RoundTimer } from 'core/components/RoundTimer';
import { Text } from 'core/components/Text';
import { socket } from 'core/api/socket.service';
import { IIssueMsg, Message } from 'core/types/socketMessageType';
import styles from './IssueGameSection.module.scss';

export const IssueGameSection: React.FC = () => {
  const { issues } = useTypeSelector(state => state.issues);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);
  const dispatch = useDispatch();
  const [isModalVisibleCreate, setModalVisibleCreate] = useState(false);
  const [isRaundStart, setRaundStartValue] = useState(false);
  const [getIssueId, setIssueId] = useState('');

  const modalShowCreate = (flag: boolean) => {
    setModalVisibleCreate(flag);
  };

  const handleSubmitCreateIssue = () => {
    modalShowCreate(false);
  };

  const handleIssueId = (id: string) => {
    setIssueId(id);
  };

  const handleCancel = () => {
    modalShowCreate(false);
  };

  const changeRoundTime = (value: number): void => {
    dispatch(setSettingRoundTime(value));
  };

  const handleRaundStart = (flag: boolean) => {
    setRaundStartValue(flag);
  };

  useEffect(() => {
    const socketCreateIssue = (msg: IIssueMsg) => {
      dispatch(setIssue(msg.payload));
    };
    const socketDeleteIssue = (msg: IIssueMsg) => {
      dispatch(deleteIssue(msg.payload));
    };
    dispatch(getIssues(currentUser.gameId));
    socket.on(Message.createIssue, socketCreateIssue);
    socket.on(Message.deleteIssue, socketDeleteIssue);
    return () => {
      socket.off(Message.createIssue, socketCreateIssue);
      socket.off(Message.deleteIssue, socketDeleteIssue);
    };
  }, []);

  return (
    <Grid container md={12} direction="column" className={styles.container}>
      <Text textLvl="label" isBold={true} className={styles.heading}>
        Issues:
      </Text>
      <Grid container className={styles.issues}>
        {issues.map(elem => {
          return (
            <Grid key={`${elem._id}`} item md={3}>
              <IssueCard
                title={elem.title}
                priority={elem.priority}
                id={elem._id}
                handleIssueId={handleIssueId}
                gameMode={true}
                currentIssueId={getIssueId}
              />
            </Grid>
          );
        })}
        {currentUser.role === Roles.creator ? (
          <Grid item md={3}>
            <IssueCardAdd modalShow={modalShowCreate} setCreateFormFlag={modalShowCreate} />
          </Grid>
        ) : null}
      </Grid>
      <Grid className={styles.timer}>
        {gameSettings.isTimer && currentUser.role === Roles.creator ? (
          <>
            <RoundTimer
              time={Number(gameSettings.roundTime)}
              editable={currentUser.role === Roles.creator ? true : false}
              onChange={changeRoundTime}
            />
            {isRaundStart ? (
              <div>
                <AppButton name={'Restart round'} color={'blue'} onClickHandler={() => {}} />
                <AppButton name={'Next issue'} color={'blue'} onClickHandler={() => {}} />
              </div>
            ) : (
              <AppButton
                name={'Run Round'}
                color={'blue'}
                onClickHandler={() => handleRaundStart(true)}
              />
            )}
          </>
        ) : null}
      </Grid>
      <CreateIssueForm
        id={getIssueId}
        flagCreate={isModalVisibleCreate}
        isShow={isModalVisibleCreate}
        handleSubmitFrom={handleSubmitCreateIssue}
        handleCancel={handleCancel}
      />
    </Grid>
  );
};
