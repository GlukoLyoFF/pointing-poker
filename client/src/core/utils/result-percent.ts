import { IssueVoteRes } from 'core/types/issueVotesType';

export const getPercentResultByCard = (results: IssueVoteRes[], cardKey: string): number => {
  let count = 0;
  results.map(elem => {
    if (elem.vote.key === cardKey) {
      count = count + 1;
    }
  });
  return (count * 100) / results.length;
};
