import { IIssueVote } from 'core/types/get200Types';
import { IssueVoteRes } from 'core/types/issueVotesType';
import { IIssueVoteBody } from 'core/types/postToServerTypes';
import axios from '.';

const path = 'issuevotes';

export const postNewIssueVote = async (body: IIssueVoteBody): Promise<IIssueVote> => {
  const response = await axios.post(path, body);
  return response.data;
};

export const getIssueVotesByGameId = async (gameId: string): Promise<IIssueVote[]> => {
  const response = await axios.get<IIssueVote[]>(`${path}/gameId/${gameId}`);
  return response.data;
};
