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
import { Issue } from 'core/types/issueType';
import { exportToXLSX } from 'core/utils/export-to-xlsx';
import styles from './ResultPage.module.scss';

const resultCSV: IResultCSV[] = [];

export const ResultPage: React.FC = () => {
  const { issues } = useTypeSelector(state => state.issues);
  const { results } = useTypeSelector(state => state.issueVote);
  const { gameInfo } = useTypeSelector(state => state.gameInfo);
  const { gameSettings } = gameInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIssues(gameInfo._id));
    dispatch(getIssuesVotesResult(gameInfo._id));
  }, []);

  const calculatePercent = (arr: IIssueVote[], index: string, card: string) => {
    const res: IIssueVote[] = arr.filter(elem => elem.issueId === index);
    const totalCount = res.length;
    const res1: IIssueVote[] = res.filter(elem => elem.vote.value === card);
    const totalVotes = res1.length;
    const percent = Math.round((totalVotes * 100) / totalCount);
    return percent;
  };

  const addResultToCSV = (issueName: string, cardValue: string, percent: number): void => {
    if (percent >= 0) {
      const csv = {
        issue: `${issueName}`,
        cardValue: `${cardValue}`,
        percent: `${percent}%`,
      };
      resultCSV.push(csv);
    }
  };

  const getIssueResult = (elem: Issue): JSX.Element => {
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
            const percent = calculatePercent(results, elem._id, card.value);
            addResultToCSV(elem.title, card.value, percent);
            return percent ? (
              <div key={card.key}>
                <GameCard type={gameSettings.shortScoreType} value={card.value} editable={false} />
                <p>{`${percent}%`}</p>
              </div>
            ) : (
              <></>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Grid>
      <div>
        <Text textLvl="label" isBold={true}>
          Game result
        </Text>
      </div>
      {results.length > 0 ? issues.map(getIssueResult) : 'No results...'}
      <div>
        <AppButton
          name={'Download XLSX'}
          onClickHandler={() => exportToXLSX(resultCSV, 'result')}
        />
        <CSVLink data={resultCSV} className={styles.csvLink}>
          <AppButton name={'Download CSV'} />
        </CSVLink>
      </div>
    </Grid>
  );
};
