import { User } from '@/types';
import { createContext } from 'react';

interface AuthContextType {
  user: User | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined as User | undefined,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  isLoading: false,
});