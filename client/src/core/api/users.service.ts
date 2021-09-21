import { IUser } from '../types/get200Types';
import { IUserBody } from '../types/postToServerTypes';
import { UserRole } from '../types/userType';
import axios from '.';

const path = 'users';

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await axios.get<IUser[]>(path);
  return response.data;
};

export const getUserById = async (userId: string): Promise<IUser[]> => {
  const response = await axios.get<IUser[]>(`${path}/${userId}`);
  return response.data;
};

export const getUsersByGame = async (gameId: string): Promise<IUser[]> => {
  const response = await axios.get<IUser[]>(`${path}/gameid/${gameId}`);
  return response.data;
};

export const getUsersByGameByRole = async (gameId: string, role: UserRole): Promise<IUser[]> => {
  const response = await axios.get<IUser[]>(`${path}/gameid/${gameId}&${role}`);
  return response.data;
};

export const postNewUser = async (body: IUserBody): Promise<IUser> => {
  const response = await axios.post(path, body);
  return response.data;
};

export const updateUserById = async (userId: string, body: IUserBody): Promise<IUser> => {
  const response = await axios.put(`${path}/${userId}`, body);
  return response.data;
};

export const deleteUserById = async (userId: string): Promise<IUser> => {
  const response = await axios.delete(`${path}/${userId}`);
  return response.data;
};
