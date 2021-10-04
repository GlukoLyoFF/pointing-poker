import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserById } from 'core/api/users.service';
import { Roles } from 'core/types/roleType';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { getUsers } from 'store/actionCreators/user';
import { AppModal } from 'core/components/modals/Modal';
import { Text } from 'core/components/Text';
import { UserCard } from 'core/components/userCard/UserCard';
import { ProgressCard } from 'core/components/progressCard/ProgressCard';
import styles from './ProgressSection.module.scss';
import { startPlayerVoting } from 'core/api/socket.service';

interface ProgressSectionProp {
  chooseIssueId: string;
}

export const ProgressSection: React.FC<ProgressSectionProp> = ({ chooseIssueId }) => {
  const { users } = useTypeSelector(state => state.users);
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const [getModalShowFlag, setModalShowFlag] = useState(false);
  const [getDeleteUserName, setDeleteUserName] = useState('');
  const [getDeleteUserId, setDeleteUserId] = useState('');
  const dispatch = useDispatch();

  const handleFlag = (flag: boolean) => {
    setModalShowFlag(flag);
  };

  const handleUserName = (name: string) => {
    setDeleteUserName(name);
  };

  const handleUserId = (id: string) => {
    setDeleteUserId(id);
  };

  const handleSubmit = async () => {
    if (currentUser.role === Roles.creator) {
      deleteUserById(getDeleteUserId);
    } else {
      const target = {
        gameId: currentUser.gameId,
        playerId: currentUser.userId,
        targetId: getDeleteUserId,
      };
      startPlayerVoting(target);
    }
    setModalShowFlag(false);
    dispatch(getUsers(currentUser.gameId));
  };

  const handleCancel = () => {
    handleFlag(false);
  };

  useEffect(() => {
    dispatch(getUsers(currentUser.gameId));
  }, []);

  return (
    <Grid container>
      <Grid item>
        <div className={styles.heading}>
          <Text textLvl="label" isBold={true}>
            Score:
          </Text>
          <Text textLvl="label" isBold={true}>
            Players:
          </Text>
        </div>
        {users.map(elem => {
          return (
            <div key={`${elem._id}`} className={styles.cards}>
              <ProgressCard chooseIssueId={chooseIssueId} userId={elem._id} />
              <UserCard
                name={elem.firstName}
                surname={elem.lastName}
                job={elem.jobPosition}
                id={elem._id}
                status={Roles.user}
                handleFlag={handleFlag}
                handleUserName={handleUserName}
                handleUserId={handleUserId}
                image={elem.image ? elem.image : ''}
              />
            </div>
          );
        })}
      </Grid>
      <AppModal
        title={`Kick player`}
        isShow={getModalShowFlag}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        children={`Are you really want to remove player ${getDeleteUserName} from game session?`}
      />
    </Grid>
  );
};
