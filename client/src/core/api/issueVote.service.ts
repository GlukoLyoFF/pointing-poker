import { IIssueVote } from 'core/types/get200Types';
import { IIssueVoteBody } from 'core/types/postToServerTypes';
import axios from '.';

const path = 'issuevotes';

export const postNewIssueVote = async (body: IIssueVoteBody): Promise<IIssueVote> => {
  const response = await axios.post(path, body);
  return response.data;
};
