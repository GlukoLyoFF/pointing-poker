export class IIssueVote {
  key: string;
  value: string;
}

export class IssueVoteDto {
  gameId: string;
  playerId: string;
  issueId: string;
  vote?: IIssueVote;
}
