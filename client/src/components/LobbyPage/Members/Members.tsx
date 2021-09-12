import axios from '../../../services/api';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { getUsers } from '../../../store/actionCreators/user';
import { AppModal } from '../../modal/modal';
import { UserCard } from '../../userCard/UserCard';
import styles from './Members.module.scss';

export const Members: React.FC = () => {
  const state = useTypeSelector(users => users.users);
  const dispatch = useDispatch();
  const [getModalShowFlag, setModalShowFlag] = useState(false);
  const [getDeleteUserName, setDeleteUserName] = useState('');
  const [getDeleteUserId, setDeleteUserId] = useState('');

  const handleFlag = (flag: boolean) => {
    setModalShowFlag(flag);
  };

  const handleUserName = (name: string) => {
    setDeleteUserName(name);
  };

  const handleCancel = () => {
    handleFlag(false);
  };

  const handleUserId = (id: string) => {
    setDeleteUserId(id);
  };

  const handleSubmit = async () => {
    await axios.delete(`users/${getDeleteUserId}`);
    setModalShowFlag(false);
    dispatch(getUsers());
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <h3>Members:</h3>
      <div className={styles.container}>
        {state.users.map(elem => {
          return (
            <UserCard
              key={`${elem._id}`}
              name={elem.firstName}
              surname={elem.lastName}
              job={elem.jobPosition}
              id={elem._id}
              handleFlag={handleFlag}
              handleUserName={handleUserName}
              handleUserId={handleUserId}
            />
          );
        })}
        <AppModal
          title={`Kick player?`}
          isShow={getModalShowFlag}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          children={`Are you really want to remove player ${getDeleteUserName} from game session?`}
        />
      </div>
    </>
  );
};
