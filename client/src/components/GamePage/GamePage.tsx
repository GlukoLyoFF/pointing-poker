import React from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { Roles } from '../../core/types/roleType';
import { CardField } from './CardField/CardField';
import { IssueGameSection } from './IssueGameSection/IssueGameSection';
import { ScramMasterGameSection } from './ScramMasterGameSection/ScramMasterGameSection';
import { ProgressSection } from './ProgressSection/ProgressSection';
import styles from './GamePage.module.scss';

export const GamePage: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);

  return (
    <main className={styles.container}>
      <div className={styles.gamePage}>
        <ScramMasterGameSection />
        <IssueGameSection />
        {currentUser.role === Roles.user ? <CardField /> : null}
      </div>
      <ProgressSection />
    </main>
  );
};
