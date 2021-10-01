import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { getCreator } from 'store/actionCreators/creator';
import { Roles } from 'core/types/roleType';
import { EditHeading } from 'core/components/editHeading/EditHeading';
import { UserCard } from 'core/components/userCard/UserCard';
import { Text } from 'core/components/Text';
import { AppButton } from 'core/components/Button';
import { Grid } from '@material-ui/core';
import { RoundTimer } from 'core/components/RoundTimer';
import styles from './ScramMasterGameSection.module.scss';
import { getGameInfo } from 'store/actionCreators/gameInfo';

interface ScramMasterProps {
  timerValue: number;
}

export const ScramMasterGameSection: React.FC<ScramMasterProps> = ({ timerValue }) => {
  const { creator } = useTypeSelector(state => state.creator);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { gameSettings } = useTypeSelector(store => store.gameInfo.gameInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCreator(currentUser.gameId));
  }, []);

  return (
    <Grid container direction="column">
      <EditHeading />
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
          <AppButton
            name={currentUser.role === Roles.creator ? 'Stop game' : 'Exit'}
            color={'white'}
            onClickHandler={() => {}}
          />
        </Grid>
        {gameSettings.isTimer && currentUser.role !== Roles.creator ? (
          <RoundTimer time={timerValue} editable={false} />
        ) : null}
      </Grid>
    </Grid>
  );
};
