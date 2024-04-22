import { User } from '@/types';
import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production'
    ? '/api/auth'
    : 'http://localhost:3000/api/auth';

interface Auth {
  token: string;
  user: User;
}

export const login = async (username: string, password: string) => {
  const response = await axios.post<Auth>(`${url}/login`, {
    username,
    password,
  });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post<Auth>(`${url}/register`, {
    username,
    password,
  });
  return response.data;
};
