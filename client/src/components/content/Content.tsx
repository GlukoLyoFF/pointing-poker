import { Box } from '@material-ui/core';
import React from 'react';
import styles from './Content.module.scss';

export const Content: React.FC = () => {
  return <Box component="main" mt="1rem" mb="1rem" className={styles.main}></Box>;
};
