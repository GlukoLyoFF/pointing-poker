import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { getCreator } from 'store/actionCreators/creator';
import { Roles } from 'core/types/roleType';
import { EditHeading } from 'core/components/editHeading/EditHeading';
import { UserCard } from 'core/components/userCard/UserCard';
import { Text } from 'core/components/Text';
import { AppButton } from 'core/components/Button';
import { Dialog, Grid } from '@material-ui/core';
import { RoundTimer } from 'core/components/RoundTimer';
import { finishGame } from 'core/api/socket.service';
import { deleteUserById } from 'core/api/users.service';
import { clearCurrentUser } from 'store/actionCreators/currentUser';
import styles from './ScramMasterGameSection.module.scss';
import { ResultPage } from 'pages/ResultPage/ResultPage';

interface ScramMasterProps {
  timerValue: number;
}

export const ScramMasterGameSection: React.FC<ScramMasterProps> = ({ timerValue }) => {
  const { creator } = useTypeSelector(state => state.creator);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameInfo } = useTypeSelector(state => state.gameInfo);
  const [isDisplayResults, setIsDisplayResults] = React.useState<boolean>(false);
  const { gameSettings } = gameInfo;
  const dispatch = useDispatch();

  const handleFinishGame = (): void => {
    if (currentUser.role === Roles.creator) {
      finishGame(currentUser);
    } else {
      deleteUserById(currentUser.userId);
      dispatch(clearCurrentUser(currentUser));
    }
  };

  const handleResults = (): void => {
    setIsDisplayResults(!isDisplayResults);
  };

  useEffect(() => {
    dispatch(getCreator(currentUser.gameId));
  }, []);

  return (
    <Grid container direction="column">
      <EditHeading gameMode={true} />
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <Grid item>
          <Text textLvl="comment">Scram master:</Text>
          <UserCard
            image={creator.image}
            name={creator.firstName}
            surname={creator.lastName}
            id={creator._id}
            status={Roles.creator}
            job={creator.jobPosition}
          />
        </Grid>
        <Grid item>
          <AppButton name={'Results'} color={'blue'} onClickHandler={handleResults} />
        </Grid>
        <Grid item>
          <AppButton
            name={currentUser.role === Roles.creator ? 'Stop game' : 'Exit'}
            color={'white'}
            onClickHandler={handleFinishGame}
          />
        </Grid>
        {gameSettings.isTimer && currentUser.role !== Roles.creator ? (
          <RoundTimer time={timerValue} editable={false} />
        ) : null}
      </Grid>
      <Dialog open={isDisplayResults} onClose={handleResults}>
        <ResultPage />
      </Dialog>
    </Grid>
  );
};
