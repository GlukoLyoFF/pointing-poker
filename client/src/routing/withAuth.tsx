import { useTypeSelector } from 'core/hooks/useTypeSelector';
import React from 'react';
import { PrivateRoute } from './PrivateRoute';

export const withAuth = (Component: React.FC) => {
  return (): JSX.Element => {
    const { currentUser } = useTypeSelector(state => state.currentUser);
    return (
      <PrivateRoute isAuth={!!currentUser.userId} redirectPath="/">
        <Component />
      </PrivateRoute>
    );
  };
};
