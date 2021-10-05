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
import { IDeleteIssueVoteMsg, IIssueMsg, ITimerMsg, Message } from 'core/types/socketMessageType';
import styles from './IssueGameSection.module.scss';
import { getIssueById } from 'core/api/issues.service';
import { StatisticCard } from 'core/components/statisticCard/StatisticCard';
import { clearIssueVoteResult } from 'store/actionCreators/issueVote';

interface IssueGameProp {
  handleTimerValue: (num: number) => void;
  handleChooseIssueId: (id: string) => void;
}

export const IssueGameSection: React.FC<IssueGameProp> = ({
  handleTimerValue,
  handleChooseIssueId,
}) => {
  const { issues } = useTypeSelector(state => state.issues);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);
  const dispatch = useDispatch();
  const [isModalVisibleCreate, setModalVisibleCreate] = useState(false);
  const [isRaundStart, setRaundStartValue] = useState(false);
  const [issueIndex, setIssueIndex] = useState(0);
  const [getIssueId, setIssueId] = useState('');
  const [count, setCount] = useState(Number(gameSettings.roundTime));
  const [isRoundEndFlag, setRoundEndFlag] = useState(false);
  const [gameCycleNum, setGameCycleNum] = useState(0);
  let timer = 0;

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
    if (issues[0]) {
      setRaundStartValue(flag);
      socket.emit('startRound', 'start');
      setIssueId(issues[issueIndex]._id);
    }
  };

  const handleRestartRound = () => {
    socket.emit('deleteIssueVotesByIssueId', `${getIssueId}`);
    socket.emit('reStartRound', 'restart');
  };

  const handleStopRound = () => {
    socket.emit('endRound', 'end');
    if (issues[issueIndex + 1]) {
      setIssueIndex(prev => prev + 1);
    } else {
      setIssueIndex(0);
      setGameCycleNum(prev => prev + 1);
    }
    if (!gameSettings.isTimer) {
      setRaundStartValue(false);
    }
  };

  const stopTimer = () => {
    if (timer) {
      window.clearInterval(timer);
    }
    setRaundStartValue(false);
    setCount(Number(gameSettings.roundTime));
  };

  const startTimer = () => {
    timer = window.setInterval(() => {
      setCount(prevCount => prevCount - 1000);
    }, 1000);
  };

  const restartTimer = () => {
    setCount(Number(gameSettings.roundTime));
    if (timer) {
      clearInterval(timer);
    }
    timer = window.setInterval(() => {
      setCount(prevCount => prevCount - 1000);
    }, 1000);
  };

  useEffect(() => {
    const socketCreateIssue = (msg: IIssueMsg) => {
      dispatch(setIssue(msg.payload));
    };
    const socketDeleteIssue = (msg: IIssueMsg) => {
      dispatch(deleteIssue(msg.payload));
    };
    const socketRunRound = (msg: ITimerMsg) => {
      if (msg.payload === 'start') {
        if (gameSettings.isTimer) {
          startTimer();
        }
        setRoundEndFlag(false);
        dispatch(clearIssueVoteResult());
      } else if (msg.payload === 'restart') {
        if (gameSettings.isTimer) {
          restartTimer();
        }
        setRoundEndFlag(false);
        dispatch(clearIssueVoteResult());
      } else if (msg.payload === 'end') {
        if (gameSettings.isTimer) {
          stopTimer();
        }
        setRoundEndFlag(true);
      }
    };
    const socketChooseIssue = (msg: IIssueMsg) => {
      handleChooseIssueId(msg.payload._id);
      setIssueId(msg.payload._id);
    };
    const socketDataDelete = (msg: IDeleteIssueVoteMsg) => {
      console.log(msg);
    };
    dispatch(getIssues(currentUser.gameId));
    socket.on(Message.startRound, socketRunRound);
    socket.on(Message.restartRound, socketRunRound);
    socket.on(Message.endRound, socketRunRound);
    socket.on(Message.chooseIssue, socketChooseIssue);
    socket.on(Message.createIssue, socketCreateIssue);
    socket.on(Message.deleteIssue, socketDeleteIssue);
    socket.on('deleteIssueVotesByIssueIdMsg', socketDataDelete);
    return () => {
      socket.off(Message.createIssue, socketCreateIssue);
      socket.off(Message.deleteIssue, socketDeleteIssue);
      socket.off(Message.chooseIssue, socketChooseIssue);
      socket.off('deleteIssueVotesByIssueIdMsg', socketDataDelete);
      socket.off(Message.startRound, socketRunRound);
      socket.off(Message.restartRound, socketRunRound);
      socket.off(Message.endRound, socketRunRound);
    };
  }, []);

  useEffect(() => {
    getIssueById(getIssueId);
    if (gameCycleNum > 0 && currentUser.role === Roles.creator) {
      socket.emit('deleteIssueVotesByIssueId', `${getIssueId}`);
    }
  }, [getIssueId]);

  useEffect(() => {
    setCount(Number(gameSettings.roundTime));
  }, [gameSettings]);

  useEffect(() => {
    if (count === 0 && gameSettings.isTimer) {
      socket.emit('endRound', 'end');
      if (issues[issueIndex + 1]) {
        setIssueIndex(prev => prev + 1);
      } else {
        setIssueIndex(0);
        setGameCycleNum(prev => prev + 1);
      }
    }
    if (count === 150000) {
      setCount(Number(gameSettings.roundTime));
    }
    handleTimerValue(count);
  }, [count]);

  return (
    <Grid container direction="column" className={styles.container}>
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
        {currentUser.role === Roles.creator ? (
          <>
            {gameSettings.isTimer ? (
              <RoundTimer time={count} editable={false} onChange={changeRoundTime} />
            ) : null}
            {isRaundStart ? (
              <div>
                <AppButton
                  name={'Restart round'}
                  color={'blue'}
                  onClickHandler={() => handleRestartRound()}
                />
                <AppButton
                  name={'Next issue'}
                  color={'blue'}
                  onClickHandler={() => handleStopRound()}
                />
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
      {isRoundEndFlag ? <StatisticCard /> : null}
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
