import { Box } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Routes } from './routes';
import { Main } from '../MainPage/Main';
import styles from './Routing.module.scss';

export const Routing: React.FC = () => {
  return (
    <Box mb="1rem" className={styles.container}>
      <Router>
        <Switch>
          {Routes.map(elem => (
            <Route key={elem.key} exact path={`${elem.path}`} component={elem.component} />
          ))}
          <Route component={Main} />
        </Switch>
      </Router>
    </Box>
  );
};
