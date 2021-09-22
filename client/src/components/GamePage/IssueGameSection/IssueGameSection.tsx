import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Roles } from '../../../core/types/roleType';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { getIssues } from '../../../store/actionCreators/issue';
import { setSettingRoundTime } from '../../../store/actionCreators/settings';
import { AppButton } from '../../Button';
import { CreateIssueForm } from '../../createIssueForm/CreateIssueForm';
import { IssueCard } from '../../issueCard/IssueCard';
import { IssueCardAdd } from '../../issueCardAdd/IssueCardAdd';
import { RoundTimer } from '../../RoundTimer';
import { Text } from '../../Text';
import styles from './IssueGameSection.module.scss';

export const IssueGameSection: React.FC = () => {
  const { issues } = useTypeSelector(state => state.issues);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const settings = useTypeSelector(store => store.settings);
  const dispatch = useDispatch();
  const [isModalVisibleCreate, setModalVisibleCreate] = useState(false);
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
        {settings.isTimer && settings.roundTime && currentUser.role === Roles.creator ? (
          <>
            <RoundTimer
              time={settings.roundTime}
              editable={currentUser.role === Roles.creator ? true : false}
              onChange={changeRoundTime}
            />
            <AppButton name={'Run Round'} color={'blue'} onClickHandler={() => {}} />
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
