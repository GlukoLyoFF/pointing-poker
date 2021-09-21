import { IIssue } from '../types/get200Types';
import { IIssueBody } from '../types/postToServerTypes';
import axios from './api';

const path = 'issues';

export const getAllIssues = async (): Promise<IIssue[]> => {
  const response = await axios.get<IIssue[]>(path);
  return response.data;
};

export const getIssueById = async (issueId: string): Promise<IIssue[]> => {
  const response = await axios.get<IIssue[]>(`${path}/${issueId}`);
  return response.data;
};

export const getIssuesByGame = async (issueId: string): Promise<IIssue[]> => {
  const response = await axios.get<IIssue[]>(`${path}/gameid/${issueId}`);
  return response.data;
};

export const postNewIssue = async (body: IIssueBody): Promise<IIssue> => {
  const response = await axios.post(path, body);
  return response.data;
};

export const updateIssueById = async (issueId: string, body: IIssueBody): Promise<IIssue> => {
  const response = await axios.put(`${path}/${issueId}`, body);
  return response.data;
};

export const deleteIssueById = async (issueId: string): Promise<IIssue> => {
  const response = await axios.delete(`${path}/${issueId}`);
  return response.data;
};
