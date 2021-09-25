import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserById } from 'core/api/users.service';
import { Roles } from 'core/types/roleType';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { getUsers } from 'store/actionCreators/user';
import { AppModal } from 'core/components/modal/Modal';
import { Text } from 'core/components/Text';
import { UserCard } from 'core/components/userCard/UserCard';
import { ProgressCard } from 'core/components/progressCard/ProgressCard';
import styles from './ProgressSection.module.scss';

export const ProgressSection: React.FC = () => {
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
    await deleteUserById(getDeleteUserId);
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
    <Grid container md={4}>
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
            <div className={styles.cards}>
              <ProgressCard />
              <UserCard
                key={`${elem._id}`}
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
        title={`Kick player?`}
        isShow={getModalShowFlag}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        children={`Are you really want to remove player ${getDeleteUserName} from game session?`}
      />
    </Grid>
  );
};
