import axios from './api';
import { IGame } from '../types/get200Types';
import { IGameBody } from '../types/postToServerTypes';

const path = 'games';

export const getAllGames = async (): Promise<IGame[]> => {
  const response = await axios.get<IGame[]>(path);
  return response.data;
};

export const getGameById = async (gameId: string): Promise<IGame> => {
  const response = await axios.get<IGame>(`${path}/${gameId}`);
  return response.data;
};

export const createNewGame = async (body: IGameBody): Promise<IGame> => {
  const response = await axios.post(path, body);
  return response.data;
};

export const updateGameById = async (gameId: string, body: IGame): Promise<IGame> => {
  const response = await axios.put(`${path}/${gameId}`, body);
  return response.data;
};

export const deleteGameById = async (gameId: string): Promise<IGame> => {
  const response = await axios.delete(`${path}/${gameId}`);
  return response.data;
};
