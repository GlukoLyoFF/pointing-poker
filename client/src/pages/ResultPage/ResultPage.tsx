import { Grid } from '@material-ui/core';
import { GameCard } from 'core/components/gameCard/GameCard';
import { IssueCard } from 'core/components/issueCard/IssueCard';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { IIssueVote } from 'core/types/get200Types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIssues } from 'store/actionCreators/issue';
import { getIssuesVotesResult } from 'store/actionCreators/issueVote';
import { CSVLink } from 'react-csv';
import { Text } from 'core/components/Text';
import { AppButton } from 'core/components/Button';
import { IResultCSV } from 'core/types/exportResultType';
import { exportToXLSX } from 'core/utils/export-to-xlsx';
import styles from './ResultPage.module.scss';

const resultCSV: IResultCSV[] = [];

export const ResultPage: React.FC = () => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const { issues } = useTypeSelector(state => state.issues);
  const { results } = useTypeSelector(state => state.issueVote);
  const { gameSettings } = useTypeSelector(state => state.gameInfo.gameInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIssues(currentUser.gameId));
    dispatch(getIssuesVotesResult(currentUser.gameId));
  }, []);

  const calculatePercent = (arr: IIssueVote[], index: string, card: string, issueName: string) => {
    const res: IIssueVote[] = arr.filter(elem => elem.issueId === index);
    const totalCount = res.length;
    const res1: IIssueVote[] = res.filter(elem => elem.vote.value === card);
    const totalVotes = res1.length;
    const percent = Math.round((totalVotes * 100) / totalCount);
    if (percent >= 0) {
      const csv = {
        issue: `${issueName}`,
        cardValue: `${card}`,
        percent: `${percent}%`,
      };
      resultCSV.push(csv);
    }
    return percent;
  };

  return (
    <Grid>
      <div>
        <Text textLvl="label" isBold={true}>
          Game result
        </Text>
      </div>
      {issues.map(elem => {
        return (
          <div key={elem._id}>
            <IssueCard
              title={elem.title}
              priority={elem.priority}
              id={elem._id}
              handleIssueId={() => {}}
              resultMode={true}
            />
            <div className={styles.cardBox}>
              {gameSettings.cardValues.map(card => {
                return (
                  <div key={card.key}>
                    <GameCard
                      type={gameSettings.shortScoreType}
                      value={card.value}
                      editable={false}
                    />
                    <p>{`${calculatePercent(results, elem._id, card.value, elem.title)}%`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <AppButton name={'Download XLSX'} onClickHandler={() => exportToXLSX(resultCSV, 'result')} />
      <CSVLink data={resultCSV} className={styles.csvLink}>
        <AppButton name={'Download CSV'} />
      </CSVLink>
    </Grid>
  );
};
