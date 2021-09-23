import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Roles } from 'core/types/roleType';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { getIssues } from 'store/actionCreators/issue';
import { setSettingRoundTime } from 'store/actionCreators/settings';
import { AppButton } from 'core/components/Button';
import { CreateIssueForm } from 'core/forms/createIssueForm/CreateIssueForm';
import { IssueCard } from 'core/components/issueCard/IssueCard';
import { IssueCardAdd } from 'core/components/issueCardAdd/IssueCardAdd';
import { RoundTimer } from 'core/components/RoundTimer';
import { Text } from 'core/components/Text';
import styles from './IssueGameSection.module.scss';

export const IssueGameSection: React.FC = () => {
  const { issues } = useTypeSelector(state => state.issues);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const settings = useTypeSelector(store => store.settings);
  const dispatch = useDispatch();
  const [isModalVisibleCreate, setModalVisibleCreate] = useState(false);
  const [isRaundStart, setRaundStartValue] = useState(false);
  const [getIssueId, setIssueId] = useState('');

  const modalShowCreate = (flag: boolean) => {
    setModalVisibleCreate(flag);
  };

  const handleSubmitCreateIssue = () => {
    dispatch(getIssues(currentUser.gameId));
    modalShowCreate(false);
  };

  const handleIssueId = (id: string) => {
    setIssueId(id);
  };

  const handleCancel = () => {
    modalShowCreate(false);
    dispatch(getIssues(currentUser.gameId));
  };

  const changeRoundTime = (value: number): void => {
    dispatch(setSettingRoundTime(value));
  };

  const handleRaundStart = (flag: boolean) => {
    setRaundStartValue(flag);
  };

  useEffect(() => {
    dispatch(getIssues(currentUser.gameId));
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
        {settings.isTimer && currentUser.role === Roles.creator ? (
          <>
            <RoundTimer
              time={Number(settings.roundTime)}
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
