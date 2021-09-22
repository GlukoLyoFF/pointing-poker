import React from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { Roles } from '../../core/types/roleType';
import { CardField } from './CardField/CardField';
import styles from './GamePage.module.scss';
import { IssueGameSection } from './IssueGameSection/IssueGameSection';
import { ScramMasterGameSection } from './ScramMasterGamePage/ScramMasterGameSection';

export const GamePage: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);

  return (
    <main className={styles.container}>
      <div className={styles.gamePage}>
        <ScramMasterGameSection />
        <IssueGameSection />
        {currentUser.role === Roles.user ? <CardField /> : null}
      </div>
    </main>
  );
};
