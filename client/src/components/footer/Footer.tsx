import { Box } from '@material-ui/core';
import React from 'react';
import logo from '../../assets/rs-logo.svg';
import GitHubIcon from '@material-ui/icons/GitHub';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Box className={styles.box}>
        <a href="https://rs.school/">
          <img src={logo} />
        </a>
        <ul className={styles.listLink}>
          <li>
            <a href="https://github.com/ArtemDerenok">
              <GitHubIcon />
              Artem Derenok
            </a>
          </li>
          <li>
            <a href="https://github.com/GlukoLyoFF">
              <GitHubIcon />
              Elena Berezenko
            </a>
          </li>
          <li>
            <a href="https://github.com/AnatoliRub">
              <GitHubIcon />
              Anatoli Rubankou
            </a>
          </li>
        </ul>
        <h3>2021</h3>
      </Box>
    </footer>
  );
};
