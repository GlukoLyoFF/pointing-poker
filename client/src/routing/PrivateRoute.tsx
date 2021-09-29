import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export const PrivateRoute: React.FC<IPrivateRouteProps> = props => {
  return props.isAuth ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export interface IPrivateRouteProps extends RouteProps {
  isAuth: boolean;
  redirectPath: string;
}
